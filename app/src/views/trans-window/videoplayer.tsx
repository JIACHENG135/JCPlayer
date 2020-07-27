import * as React from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerPluginOptions } from 'video.js'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
import './videoplayer.less'

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

interface VideoPlayerState {}
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
// const win: BrowserWindow | undefined = $tools.windowList.get('Trans')

export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface, VideoPlayerState> {
  private videoNode?: HTMLVideoElement

  constructor(props: VideoPlayerPropsInferface) {
    super(props)
  }

  state: VideoPlayerState = {
    player: undefined,
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
      this.play()
    })
  }
  render() {
    return (
      <div>
        <video
          ref={(node: HTMLVideoElement) => (this.videoNode = node)}
          {...this.props}
          className="vjs-matrix video-js"
          id="my-video"
        >
          <source src={this.props.src}></source>
        </video>
      </div>
    )
  }
}
