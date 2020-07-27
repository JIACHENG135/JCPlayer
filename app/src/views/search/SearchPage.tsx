import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'

import axios from 'axios'
import { Layout, Input, Row, Col, Radio, Button } from 'antd'
import BookRow from './components/book-row'
import PerfectScrollbar from 'react-perfect-scrollbar'
import path from 'path'
import './search.less'

import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcRendererEvent } from 'electron'

// const themePath = $tools.asAssetsPath('/themes/')

// const fast = require($tools.asAssetsPath('/themes/1/Fluid-3.3s-3000px.svg'))

// console.log(images)

const { Header, Content } = Layout
const { Search } = Input

interface SearchProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

const { ipcRenderer, shell, remote, downloadItem } = window.require('electron')

const win: BrowserWindow = remote.getCurrentWindow()

declare interface SearchState {
  cols: number
  resData: queryTestInfoUsingGET.Response | {} | any
  loading: boolean
  currentPage: string | number | any
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  canv: boolean
}

/**
 * SearchProps 是组件的 props 类型声明
 * SearchState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const theme = $tools.getGlobalStore().get('MyTheme')
@withStore(['count', { countAlias: 'count' }])
export default class SearchPage extends React.Component<SearchProps, SearchState> {
  // state 初始化
  state: SearchState = {
    resData: {},
    loading: false,
    cols: 6,
    currentPage: 1,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    canv: false,
  }

  // 构造函数
  constructor(props: SearchProps) {
    super(props)
  }
  // canva = document.createElement('CANVAS')
  componentWillUnmount() {}
  componentDidMount() {
    win.on('resize', this.throttle(this.onResize, 200).bind(this, win))
    const assets = $tools.ASSETS_PATH
    const bgStyle =
      process.platform == 'darwin'
        ? '.app-content{background-image: url(' + assets + '/themes/' + theme + '/Fluid-10s-3000px.png'
        : '.app-content{background-image: url(https://ssjh.s3-ap-northeast-1.amazonaws.com/themes/' +
          theme +
          '/Fluid-10s-3000px.png)}'

    const key = win.webContents.insertCSS(bgStyle)

    $tools.getGlobalStore().set('globalBg', key)
    ipcRenderer.on('Search Page Speed Up', (event: IpcRendererEvent, msg: any) => {
      this.setState(msg => ({
        createWindowLoading: true,
      }))
    })
    ipcRenderer.on('Search Page Slow Down', (event: IpcRendererEvent, msg: any) => {
      this.setState(msg => ({
        createWindowLoading: false,
      }))
    })
  }
  setInputValue(e: any) {
    this.setState({
      value: e,
      resData: {},
    })
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
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

  onResize(win: BrowserWindow) {
    const bound = win.getBounds()
    if (!this.state.createWindowLoading) {
      if (bound.width < 800) {
        this.setState({
          cols: 2,
        })
      } else if (bound.width < 1200) {
        this.setState({
          cols: 4,
        })
      } else if (bound.width < 1600) {
        this.setState({
          cols: 6,
        })
      } else if (this.state.cols < 8) {
        this.setState({
          cols: 8,
        })
      }
    }
  }
  handlesearch(value: any) {
    console.log(typeof this.state.value)
    $tools.getGlobalStore().set('searchValue', value)
    try {
      this.setState({
        resData: {
          results: [],
        },
        loading: true,
      })

      axios.get('https://libgen-user.herokuapp.com/?v=' + value + '&page=1&size=24').then((resData: any) => {
        console.log(resData)
        this.setState({
          resData: resData.data,
          loading: false,
        })
      })
    } catch (err) {}
  }

  handleNextPre(url: string) {
    try {
      this.setState({
        resData: {
          results: [],
        },
        loading: true,
      })

      axios.get(url).then((resData: any) => {
        this.setState({
          resData: resData.data,
          loading: false,
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { resData, loading, createWindowLoading } = this.state
    const results: Array<any> = resData.results

    // let bookLen
    // let rows
    // let index
    let bookArray
    let bookblock
    let bookArea

    let nextButton
    let prevButton
    // let currentPage

    if (results) {
      bookblock = new Array<any>()
      // index = 0
      // bookLen = results.length
      bookArray = new Array<any>()
      // currentPage = this.state.currentPage
      for (const book of results) {
        if (bookArray.length % this.state.cols == 0) {
          bookblock.push(<BookRow items={bookArray} grid={this.state.cols}></BookRow>)

          bookArray = new Array<any>()
        }
        bookArray.push(book)
        // index += 1
      }
      if (bookArray.length > 0) {
        bookblock.push(<BookRow items={bookArray} grid={this.state.cols}></BookRow>)
      }
      bookArea = bookblock.map((item, index) => {
        return <div key={index}>{item}</div>
      })
    } else {
      bookArea = ''
      // currentPage = ' '
    }
    if (this.state.resData.prev) {
      nextButton = (
        <Button onClick={this.handleNextPre.bind(this, resData.prev)} type="primary" className="page-button">
          上一页
        </Button>
      )
    } else {
      nextButton = ' '
    }
    if (this.state.resData.next) {
      prevButton = (
        <Button onClick={this.handleNextPre.bind(this, resData.next)} type="primary" className="page-button">
          下一页
        </Button>
      )
    } else {
      prevButton = ' '
    }
    // let bgimage
    const domain =
      process.platform == 'darwin'
        ? $tools.ASSETS_PATH + '/themes/'
        : 'https://ssjh.s3-ap-northeast-1.amazonaws.com/themes/'
    const bimage =
      createWindowLoading || loading
        ? domain + theme + '/Fluid-10s-3000px.svg'
        : domain + theme + '/Fluid-10s-3000px.png'
    return (
      <Layout
        className="demo-container"
        style={{
          backgroundImage: 'url(' + bimage + ')',
        }}
      >
        <PerfectScrollbar>
          <Header></Header>
          <Content>
            <Row gutter={[0, 10]}>
              <Col span={1}></Col>
              <Col span={22}>
                <div style={{ textAlign: 'center' }}>
                  <span>
                    <img src={$tools.APP_ICON} width="44" />
                  </span>
                  <span style={{ marginLeft: '10px' }}>
                    <img src={$tools.APP_TEXT} width="110" alt="" />
                  </span>
                </div>
              </Col>
              <Col span={1}></Col>
            </Row>
            <Row gutter={[0, 20]} style={{ paddingTop: '20px' }}>
              <Col span={6}></Col>
              <Col span={12}>
                <Search
                  placeholder="Search something!"
                  loading={loading}
                  enterButton
                  allowClear
                  onSearch={(value: any) => this.handlesearch(value)}
                />
              </Col>
              <Col span={6}></Col>
            </Row>
            <div className="mid-item">
              <Radio.Group
                onChange={(ev: any): void => this.setInputValue(ev.target.value)}
                value={this.state.value}
              >
                <Radio value={1}>搜名字</Radio>
                <Radio value={2}>搜类别</Radio>
              </Radio.Group>
            </div>

            {bookArea}
            <div className="page-design">
              <span>{prevButton}</span>
              <span>{nextButton}</span>
            </div>
          </Content>
        </PerfectScrollbar>
      </Layout>
    )
  }

  asyncDispatch = (dispatch: Dispatch) => {
    return new Promise(resolve => {
      this.setState({ asyncDispatchLoading: true })
      setTimeout(() => {
        const { count } = this.props
        dispatch({ type: 'ACTION_ADD_COUNT', data: count + 1 })
        this.setState({ asyncDispatchLoading: false })
        resolve()
      }, 800)
    })
  }

  openNewWindow = () => {
    this.setState({ createWindowLoading: true })
    $tools.createWindow('Demo').finally(() => this.setState({ createWindowLoading: false }))
  }

  requestTest() {
    this.setState({ loading: true })
    $api
      .queryTestInfo('category/python', { page: 1 })
      .then(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestError() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({})
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }

  requestTestErrorModal() {
    this.setState({ loading: true })
    $api
      .queryTestInfoError({}, { errorType: 'modal' })
      .catch(resData => {
        this.setState({ resData })
      })
      .finally(() => this.setState({ loading: false }))
  }
} // class Demo end
