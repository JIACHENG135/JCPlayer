import React from 'react'
import './item.less'
import { Rate } from 'antd'
// import { Timeline, Tween } from 'react-gsap'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
import { LinkedList } from '@/core/tools/dataStructure/LinkedList'

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
// $tools.getGlobalStore().delete('hist')
export default class Item extends React.Component<CarouselItemProps, CarouselItemState> {
  constructor(props: CarouselItemProps) {
    super(props)
  }
  state: CarouselItemState = {
    resData: [{}],
  }
  handleDetail(data: any) {
    $tools.getGlobalStore().set('detail', data)

    const histData: any = $tools.getGlobalStore().get('hist', new Array<any>())

    const hist: LinkedList = new LinkedList()

    hist.serilize(histData)

    hist.getItem(data.name, data)

    const res = hist.export()

    console.log(res)
    $tools.getGlobalStore().set('hist', res)

    const searchWin: BrowserWindow | undefined = $tools.windowList.get('SearchPage')

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
    let nameText
    if (carouselItem.name && carouselItem.name?.length > 10) {
      nameText = carouselItem.name?.substr(0, 10) + '...'
    } else {
      nameText = carouselItem.name
    }
    return (
      <div>
        <div className="item-layer" onClick={this.handleDetail.bind(this, carouselItem)}>
          <img src={carouselItem.cover} alt="" className="item-image" />
          <p className="item-text">{nameText}</p>

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
