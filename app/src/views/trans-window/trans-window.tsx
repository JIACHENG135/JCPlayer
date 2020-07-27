import * as React from 'react'

import './trans-window.less'
import VideoPlayer from './videoplayer'
// import VideoPlayer from './player'

import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
// import ReactLoading from 'react-loading'

// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'

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
let winSize: Array<number>
if (win) {
  winSize = win.getSize()
} else {
  winSize = remote.getCurrentWindow().getSize()
}

interface LoginProps extends PageProps, StoreProps {
  player: any
}

declare interface LoginState {
  translated: string
  loading: boolean
  winHeight: number
  winWidth: number
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
export default class TransWindow extends React.Component<LoginProps, LoginState> {
  // state 初始化
  private videoNode?: HTMLVideoElement

  state: LoginState = {
    translated: '',
    loading: true,
    winHeight: winSize[1],
    winWidth: winSize[0],
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
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

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  canva = (<canvas></canvas>)

  render() {
    const { winWidth, winHeight } = this.state
    const videoJsOptions = {
      // autoPlay: true,
      controls: true,
      src: $tools.getGlobalStore().get('play-url'),
      // sources: [
      //   {
      //     src: $tools.getGlobalStore().get('play-url'),
      //     type: 'video/mp4',
      //   },
      // ],
      poster: $tools.getGlobalStore().get('poster'),
      width: winWidth,
      height: winHeight,
    }

    return (
      <div className="container-window">
        <VideoPlayer {...videoJsOptions} />
      </div>
    )
  }
} // class Demo end
