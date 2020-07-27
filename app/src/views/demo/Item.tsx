import React from 'react'
import './item.less'
import { Rate } from 'antd'
import Store from 'electron-store'
// import { Timeline, Tween } from 'react-gsap'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcRendererEvent, IpcMain } from 'electron'

interface CarouselItemProps {
  item: CarouselItem
}
interface CarouselItemState {
  resData: Array<any> | any
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
      // browserWindow: BrowserWindow
    }
  }
}
const { ipcRenderer, shell, remote, downloadItem } = window.require('electron')

export default class Item extends React.Component<CarouselItemProps, CarouselItemState> {
  constructor(props: CarouselItemProps) {
    super(props)
  }
  state: CarouselItemState = {
    resData: [{}],
  }
  handleDetail(data: any) {
    // console.log(data)
    // $tools.getGlobalStore().set('pkvalue', pk)
    $tools.getGlobalStore().set('detail', data)
    // console.log(browserWindow)
    const searchWin: BrowserWindow | undefined = $tools.windowList.get('SearchPage')
    console.log(searchWin)
    searchWin?.webContents.send('Search Page Speed Up')
    $tools
      .createWindow('Details', {
        windowOptions: { title: 'Details', transparent: false, resizable: false },
        createConfig: { single: true },
      })
      .then(() => {
        $tools.windowList.get('SearchPage')?.webContents.send('Search Page Slow Down')
      })
  }
  render() {
    const carouselItem = {
      // bookAuthor: this.props.item.data.author,
      // bookTitle: this.props.item.data.title,
      // bookRating: Math.floor(this.props.item.data.rating.average / 2),
      // bookPic: this.props.item.data.image,
      // bookInfos: this.props.item.data.summary,
      // bookOrigin: this.props.item.data.alt,
      // bookCategory: this.props.item.data.tags,
      alia: this.props.item.别名,
      pres: this.props.item.导演,
      actors: this.props.item.主演,
      cate: this.props.item.类型,
      region: this.props.item.地区,
      lang: this.props.item.语言,
      showtime: this.props.item.上映,
      leng: this.props.item.片长,
      update: this.props.item.更新,
      totalfreq: this.props.item.总播放量,
      todayfreq: this.props.item.今日播放量,
      totalrating: this.props.item.总评分数,
      ratingfreq: this.props.item.评分次数,
      name: this.props.item.name,
      cover: this.props.item.cover,
      rating: this.props.item.评分,
      address: this.props.item.address,
    }

    return (
      <div>
        <div className="item-layer" onClick={this.handleDetail.bind(this, carouselItem)}>
          <img src={carouselItem.cover} alt="" className="item-image" />
          <p className="item-text">{carouselItem.name}</p>
          <span className="rating-text">评分: </span>
          <Rate disabled defaultValue={parseInt(carouselItem.rating)} className="rate" />
        </div>
        {/* <Timeline
          target={

          }
        >
          <Tween from={{ opacity: 0, x: '-100px' }} to={{ opacity: 1, x: '0' }} duration={0.8} />
        </Timeline> */}
      </div>
    )
  }
}
