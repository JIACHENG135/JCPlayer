import * as React from 'react'

import Store from 'electron-store'

interface PrepdfProps extends PageProps, StoreProps {}

declare interface PrepdfState {
  location: string | number | null
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const store = new Store<any>()

const filename = store.get('pdf-filename')

export default class Prepdf extends React.Component<PrepdfProps, PrepdfState> {
  // state 初始化
  state: PrepdfState = {
    location: store.get(filename) ? store.get(filename) : 2,
  }

  // 构造函数
  constructor(props: PrepdfProps) {
    super(props)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  render() {
    // const pdf = pdfjs.getDocument(loadingUrl)
    // const { count: reduxCount, countAlias } = this.props

    return (
      <div>
        <a href="">test</a>
      </div>
    )
  }
} // class Demo end
