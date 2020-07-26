import * as React from 'react'

import Store from 'electron-store'
interface PreviewProps extends PageProps, StoreProps {}

declare interface PreviewState {
  location: string | number | null
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const store = new Store<any>()
const filename = store.get('filename')

export default class Preview extends React.Component<PreviewProps, PreviewState> {
  // state 初始化
  state: PreviewState = {
    location: store.get(filename) ? store.get(filename) : 2,
  }

  // 构造函数
  constructor(props: PreviewProps) {
    super(props)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  render() {
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div style={{ position: 'relative', height: '100%' }}>
        <video
          id="my-video"
          className="video-js"
          controls
          preload="auto"
          width="640"
          height="264"
          poster="MY_VIDEO_POSTER.jpg"
          data-setup="{}"
        >
          <source src="http://zuidazy.xunleiziyuan.net/1801/反物质危机.BD1280高清中字版.mp4" type="video/mp4" />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="https://videojs.com/html5-video-support/">supports HTML5 video</a>
          </p>
        </video>
      </div>
    )
  }
} // class Demo end
