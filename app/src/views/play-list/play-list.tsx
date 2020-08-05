import * as React from 'react'

import './play-list.less'
import { v4 as uuidv4 } from 'uuid'
// import PlayListTable from './play-list-table'

import Grow from '@material-ui/core/Grow'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import VideoPlayer from './player'
import { BrowserWindow } from 'electron'
// import ReactLoading from 'react-loading'

import PlayAccord from './play-accord'

// import './login.module.less'

const { remote } = window.require('electron')
const win: BrowserWindow = remote.getCurrentWindow()
// const win: BrowserWindow | undefined = $tools.windowList.get('Trans')
let winSize: Array<number>
if (win) {
  winSize = win.getSize()
} else {
  winSize = remote.getCurrentWindow().getSize()
}

interface PlayListProps {
  cover: string
  items: Array<any>
  name: string
}

declare interface PlayListState {}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
export default class PlayList extends React.Component<PlayListProps, PlayListState> {
  // state 初始化

  state: PlayListState = {}

  // 构造函数
  constructor(props: PlayListProps) {
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
    const { cover, items, name } = this.props
    const table = items.map((item: number, index: number) => {
      return (
        <Grow key={uuidv4()} in={true} timeout={300 * index}>
          <div key={uuidv4()} className="grow-row">
            <PlayAccord name={name} item={item} cover={cover} index={index}></PlayAccord>
          </div>
        </Grow>
      )
    })
    return (
      <PerfectScrollbar>
        <div className="play-list-container">{table}</div>
      </PerfectScrollbar>
    )
  }
}
