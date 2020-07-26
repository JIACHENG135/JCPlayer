// import * as React from 'react'
// import videojs from 'video.js'

// // Styles
// import 'video.js/dist/video-js.css'
// import Store from 'electron-store'
// import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem } from 'electron'
// interface VideoPlayerState {
//   videoJsOptions: videojs.PlayerOptions
//   player: any
//   videoNode?: HTMLVideoElement
// }

// interface VideoPlayerPropsInferface {
//   videoJsOptions: videojs.PlayerOptions
// }
// declare global {
//   interface Window {
//     require: (
//       module: 'electron'
//     ) => {
//       ipcRenderer: IpcRenderer
//       shell: Shell
//       remote: Remote
//       downloadItem: DownloadItem
//     }
//   }
// }
// const { ipcRenderer, shell, remote, downloadItem } = window.require('electron')
// const store = new Store<any>()
// const win: BrowserWindow = remote.getCurrentWindow()
// const winSize = win.getSize()
// export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface, VideoPlayerState> {
//   private player?: videojs.Player
//   private videoNode?: HTMLVideoElement
//   state: VideoPlayerState = {
//     videoNode: undefined,
//     videoJsOptions: {
//       autoplay: true,
//       controls: true,
//       sources: [
//         {
//           src: store.get('play-url'),
//           type: 'video/mp4',
//         },
//       ],
//       poster: store.get('poster'),
//       width: winSize[0],
//       height: winSize[1],
//     },
//     player: undefined,
//   }
//   constructor(props: VideoPlayerPropsInferface) {
//     super(props)
//   }

//   componentDidMount() {
//     // instantiate video.js

//     console.log(this.props)
//     // const player = videojs(this.videoNode, this.state.videoJsOptions).ready(() => {
//     //   console.log('Ready')
//     // })
//     this.setState({
//       player: videojs(this.videoNode, this.props),
//     })
//     win.on('resize', this.throttle(this.onResize, 100).bind(this, win))
//   }
//   throttle(fn: Function, rateTime: number) {
//     let prev = Date.now() - rateTime
//     return (...args: any[]) => {
//       if (Date.now() - prev >= rateTime) {
//         fn.apply(this, args)
//         prev = Date.now()
//       }
//     }
//   }
//   onResize(win: BrowserWindow) {
//     const bound = win.getSize()

//     // const options = {
//     //   autoplay: true,
//     //   controls: true,
//     //   sources: [
//     //     {
//     //       src: store.get('play-url'),
//     //       type: 'video/mp4',
//     //     },
//     //   ],
//     //   width: bound[0],
//     //   height: bound[1],
//     // }
//     // this.setState({
//     //   videoJsOptions: options,
//     // })
//     // this.player.height = bound[0]
//     // this.player.width = bound[1]
//   }
//   // destroy player on unmount
//   componentWillUnmount() {
//     if (this.player) {
//       this.player.dispose()
//     }
//   }

//   render() {
//     return (
//       <div className="c-player">
//         <div className="c-player__screen" data-vjs-player="true">
//           <video
//             ref={(node: HTMLVideoElement) => (this.videoNode = node)}
//             className="video-js"
//             width={this.state.videoJsOptions.width}
//             height={this.state.videoJsOptions.height}
//           />
//         </div>
//         <div className="c-player__controls">
//           <button>Play</button>
//           <button>Pause</button>
//         </div>
//       </div>
//     )
//   }
// }

import * as React from 'react'
import videojs, { VideoJsPlayer, VideoJsPlayerPluginOptions } from 'video.js'

// Styles
// import 'video.js/dist/video-js.css'
import Store from 'electron-store'
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
const store = new Store<any>()
const win: BrowserWindow = remote.getCurrentWindow()
// const win: BrowserWindow | undefined = $tools.windowList.get('Trans')
let winSize: Array<number>
if (win) {
  winSize = win.getSize()
} else {
  winSize = remote.getCurrentWindow().getSize()
}
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
    // const options = {
    //   autoplay: true,
    //   controls: true,
    //   sources: [
    //     {
    //       src: store.get('play-url'),
    //       type: 'video/mp4',
    //     },
    //   ],
    //   width: bound[0],
    //   height: bound[1],
    // }
    // this.player.height = bound[0]
    // this.player.width = bound[1]
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  componentDidMount() {
    const bound = win.getSize()
    let player
    const throttle = this.throttle
    const onresize = this.onResize
    const sleep = this.sleep
    videojs('my-video', {}).ready(function() {
      //   console.log(this)
      player = this
      win.on('resize', throttle(onresize, 200).bind(this, win, player))
      this.play()
      // const detailWin: BrowserWindow | undefined = $tools.windowList.get('Details')
      // detailWin?.webContents.send('Slow Down', 'You can slow down the bgimage now')
    })
  }

  componentWillUnmount() {}

  render() {
    // console.log(this.videoNode)
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
