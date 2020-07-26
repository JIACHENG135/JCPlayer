import * as React from 'react'

import './fless-trans.less'

// import VideoPlayer from './player'
import Store from 'electron-store'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
// import ReactLoading from 'react-loading'

// import { Button, Input, Spin, Card } from 'antd'

// import './login.module.less'
// import './canvas.less'

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

interface LoginProps extends PageProps, StoreProps {}

declare interface LoginState {}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
export default class FramelessWindow extends React.Component<LoginProps, LoginState> {
  // state 初始化

  state: LoginState = {}

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

  render() {
    return <div className="container-window"></div>
  }
}
