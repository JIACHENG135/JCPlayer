import * as React from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerPluginOptions } from 'video.js'
import { IpcRenderer, IpcRendererEvent, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import './videoplayer.less'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PlayList from '../play-list/play-list'

interface VideoPlayerPropsInferface {
  aspectRatio?: string
  autoplay?: boolean | string
  controlBar?: videojs.ControlBarOptions | false
  textTrackSettings?: videojs.TextTrackSettingsOptions
  controls?: boolean
  defaultVolume?: number
  fluid?: boolean
  height?: number
  html5?: any
  inactivityTimeout?: number
  language?: string
  languages?: { [code: string]: videojs.LanguageTranslations }
  liveui?: boolean
  loop?: boolean
  muted?: boolean
  nativeControlsForTouch?: boolean
  notSupportedMessage?: string
  playbackRates?: number[]
  plugins?: Partial<VideoJsPlayerPluginOptions>
  poster?: string
  preload?: string
  sourceOrder?: boolean
  sources?: videojs.Tech.SourceObject[]
  src?: string
  techOrder?: string[]
  tracks?: videojs.TextTrackOptions[]
  width?: number
}

interface VideoPlayerState {
  player: any
  curUrl: string
}
declare global {
  interface Window {
    require: (
      module: 'electron'
    ) => {
      ipcMain: IpcMain
      ipcRenderer: IpcRenderer
      shell: Shell
      remote: Remote
      downloadItem: DownloadItem
    }
  }
}

const { ipcRenderer, shell, remote, downloadItem } = window.require('electron')
const win: BrowserWindow = remote.getCurrentWindow()
const curUrl = $tools.getGlobalStore().get('play-url')

// const win: BrowserWindow | undefined = $tools.windowList.get('Trans')

export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface, VideoPlayerState> {
  private videoNode?: HTMLVideoElement

  constructor(props: VideoPlayerPropsInferface) {
    super(props)
  }

  state: VideoPlayerState = {
    player: undefined,
    curUrl: $tools.getGlobalStore().get('play-url', ''),
  }
  throttle(fn: Function, rateTime: number) {
    let prev = Date.now() - rateTime
    return (...args: any[]) => {
      if (Date.now() - prev >= rateTime) {
        fn.apply(this, args)
        prev = Date.now()
      }
    }
  }

  onResize(win: BrowserWindow, player: VideoJsPlayer) {
    const bound = win.getSize()
    player.dimensions(bound[0], bound[1])
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  componentDidMount() {
    let player
    const throttle = this.throttle
    const onresize = this.onResize

    videojs('my-video', {}).ready(function() {
      player = this
      win.on('resize', throttle(onresize, 200).bind(this, win, player))
      const lastTime = $tools.getGlobalStore().get(curUrl, undefined)
      if (lastTime != undefined) {
        this.currentTime(lastTime)
      }
      this.play()
    })
    ipcRenderer.on('Play this url', (event: IpcRendererEvent, msg: string) => {
      remote.getCurrentWindow().webContents.send('Current url update', msg)
      videojs('my-video').src(msg)
      videojs('my-video').ready(function() {
        this.play()
      })
    })
  }
  close() {
    $tools.getGlobalStore().set(curUrl, videojs('my-video').currentTime())
    remote.getCurrentWindow().close()
  }
  render() {
    const closeButton = <Button type="primary" danger icon={<CloseOutlined />} />
    const data = $tools.getGlobalStore().get('detail', Array<any>())
    const { cover, name, address } = data
    const { curUrl } = this.state
    return (
      <PerfectScrollbar>
        <div className="close-area" onClick={this.close.bind(this)}>
          {closeButton}
        </div>
        <div className="player-drag-area"></div>
        <div className="play-list-table">
          <PlayList cover={cover} name={name} items={address} curUrl={curUrl}></PlayList>
        </div>
        <video
          ref={(node: HTMLVideoElement) => (this.videoNode = node)}
          {...this.props}
          className="vjs-matrix video-js"
          id="my-video"
        >
          <source src={this.props.src}></source>
        </video>
      </PerfectScrollbar>
    )
  }
}
