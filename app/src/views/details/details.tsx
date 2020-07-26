import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import axios from 'axios'
import { withStore } from '@/src/components'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcRendererEvent, IpcMain } from 'electron'
import PlayList from './components/play-list'
import Store from 'electron-store'
import { Layout, Button, Row, Col } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { CloseOutlined } from '@ant-design/icons'
import './details.less'

const { Content } = Layout
const store = new Store<any>()
interface DetailsProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DetailsState {
  data: any
  s4books: any
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
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

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const data = store.get('detail')
const s4books = store.get('s4books')
let win: BrowserWindow
win = remote.getCurrentWindow()
const theme = store.get('MyTheme')

@withStore(['count', { countAlias: 'count' }])
export default class Details extends React.Component<DetailsProps, DetailsState> {
  // state 初始化
  state: DetailsState = {
    data: data,
    s4books: s4books,
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
  }
  // 构造函数
  constructor(props: DetailsProps) {
    super(props)
  }
  postoption: RequestOptions = {
    formData: false,
    method: 'GET',
    errorType: 'modal',
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  componentDidMount() {
    const assets = $tools.ASSETS_PATH
    const bgStyle =
      process.platform == 'darwin'
        ? '.app-content{background-image: url(' + assets + '/themes/' + theme + '/Valley-3.3s-2255px.png)}'
        : '.app-content{background-image: url(https://ssjh.s3-ap-northeast-1.amazonaws.com/themes/' +
          theme +
          '/Valley-3.3s-3000px.png)}'
    win.webContents.insertCSS(bgStyle)
    ipcRenderer.on('Slow Down', (event: IpcRendererEvent, arg: any) => {
      this.setState(msg => ({
        loading: false,
      }))
      console.log(arg)
    })
    ipcRenderer.on('Speed Up', (event: IpcRendererEvent, arg: any) => {
      this.setState(msg => ({
        loading: true,
      }))
      console.log(arg)
    })
  }
  handleClose() {
    this.props.closeWindow()
  }
  image = (<img src={$tools.SIGN_UP} width="100%" alt="sign" />)
  handleDownload(url: string, filename: any) {
    const win: BrowserWindow = remote.getCurrentWindow()
    const savepath = `${$tools.AssetsPath('preview-file')}/${filename}`
    const n = new remote.Notification({
      icon: $tools.APP_ICON,
      title: 'Download completed',
      body: 'Download completed',
      sound: 'Purr',
    })
    win.webContents.downloadURL(url)
    win.webContents.session.on('will-download', (event: any, item: DownloadItem) => {
      item.setSavePath(savepath)
      console.log(savepath)
      item.once('done', (event: any, state: any) => {
        if (state === 'completed') {
          n.show()
          console.log('Finished downloading')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }

  handleLibgenDownload(url: string, filename: any) {
    const win: BrowserWindow = remote.getCurrentWindow()
    const actUrl =
      'http://93.174.95.29/fiction/' +
      this.state.data.images.large.replace('http://93.174.95.29/fictioncovers/', '').replace('.jpg', '') +
      '.' +
      this.state.data.extension +
      '/' +
      this.state.data.title +
      '.' +
      this.state.data.extension

    const savepath = `${$tools.AssetsPath('preview-file')}/${filename}`
    win.webContents.downloadURL(actUrl)
    win.webContents.session.on('will-download', (event: any, item: DownloadItem) => {
      item.setSavePath(savepath)
      console.log(savepath)
      item.once('done', (event: any, state: any) => {
        if (state === 'completed') {
          console.log('Finished downloading')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })
  }
  handlePreviewPdf(locator: string, md5: string, filename: string) {
    // store.set('pdf-filename', filename)
    // store.set('locator', locator)
    // store.set('md5', md5)
    if (win) {
    } else {
      win = remote.getCurrentWindow()
    }
    let loadingUrl
    axios
      .get('http://127.0.0.1:8000/api/downloadlib/' + locator + '/' + md5 + '/' + filename)
      .then((res: any) => {
        loadingUrl = res.data
        store.set('loadingUrl', loadingUrl)
        // $tools.createWindow('Prepdf', {
        //   windowOptions: { title: 'Preview PDF file', transparent: false },
        // })
      })
  }
  handlePreview(url: string, filename: any) {
    store.set('filename', filename)
    if (win) {
    } else {
      win = remote.getCurrentWindow()
    }
    store.set('epuburl', url)
    $tools.createWindow('Preview', {
      windowOptions: { title: 'Preview', transparent: false },
    })
    store.set('bookname', this.state.data.title)
  }
  render() {
    store.set('poster', this.state.data.cover)

    const { loading } = this.state

    let name
    if (this.state.data.name?.length > 0) {
      name = (
        <div>
          <p className="book-text cata-tag">名称: {this.state.data.name}</p>
        </div>
      )
    } else {
      name = ''
    }

    let rating
    if (parseInt(this.state.data.rating) > 0) {
      rating = (
        <p className="book-text cata-tag">
          评分: {this.state.data.rating}{' '}
          <span>
            ({this.state.data.ratingfreq}
            {'人评分'})
          </span>
        </p>
      )
    } else {
      rating = ''
    }

    let update
    if (this.state.data.update?.length > 0) {
      update = (
        <div>
          <p className="book-text cata-tag">更新时间: {this.state.data.update}</p>
        </div>
      )
    } else {
      update = ''
    }

    let pres
    if (this.state.data.update?.pres > 0) {
      pres = (
        <div>
          <p className="book-text cata-tag">导演: {this.state.data.pres}</p>
        </div>
      )
    } else {
      pres = ''
    }

    let alia
    if (this.state.data.alia?.length > 0) {
      alia = (
        <div>
          <p className="book-text cata-tag">别名: {this.state.data.alia}</p>
        </div>
      )
    } else {
      alia = ''
    }

    let cate
    if (this.state.data.cate?.length > 0) {
      cate = (
        <div>
          <p className="book-text cata-tag">类型: {this.state.data.cate}</p>
        </div>
      )
    } else {
      cate = ''
    }

    let region
    if (this.state.data.region?.length > 0) {
      region = (
        <div>
          <p className="book-text cata-tag">地区: {this.state.data.region}</p>
        </div>
      )
    } else {
      region = ''
    }

    let lang
    if (this.state.data.lang?.length > 0) {
      lang = (
        <div>
          <p className="book-text cata-tag">类型: {this.state.data.lang}</p>
        </div>
      )
    } else {
      lang = ''
    }

    let leng
    if (parseInt(this.state.data.leng) > 0) {
      leng = (
        <div>
          <p className="book-text cata-tag">片长: {this.state.data.leng}</p>
        </div>
      )
    } else {
      leng = ''
    }

    const address = this.state.data.address
    const play = <PlayList adds={address} cols={6}></PlayList>
    store.set('play-list', this.state.data.address)
    const domain =
      process.platform == 'darwin'
        ? $tools.ASSETS_PATH + '/themes/'
        : 'https://ssjh.s3-ap-northeast-1.amazonaws.com/themes/'
    const bimage = loading
      ? domain + theme + '/Valley-3.3s-2255px.svg'
      : domain + theme + '/Valley-3.3s-2255px.png'
    return (
      <Layout
        className="book-detail-container"
        style={{
          backgroundImage: 'url(' + bimage + ')',
        }}
      >
        <Layout>
          <Content>
            <Row>
              <Col flex="260px">
                <img src={this.state.data.cover} className="detail-image" alt="" />
              </Col>

              <Col flex="auto" className="book-right-area">
                <PerfectScrollbar key={uuidv4()}>
                  <div className="book-right-container">
                    {name}
                    {rating}
                    {update}
                    {pres}
                    {alia}
                    {cate}
                    {region}
                    {lang}
                    {leng}
                    {play}

                    <div>
                      <span
                        className="book-icon"
                        title="Close the window"
                        onClick={this.handleClose.bind(this)}
                      >
                        <Button type="primary" danger icon={<CloseOutlined />} />
                      </span>
                    </div>
                  </div>
                </PerfectScrollbar>
              </Col>
            </Row>
          </Content>
        </Layout>
      </Layout>
    )
  }
} // class Demo end
