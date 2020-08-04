import React from 'react'
import './item.less'
import { Rate } from 'antd'
// import { Timeline, Tween } from 'react-gsap'
import { IpcRenderer, Shell, BrowserWindow, Remote, DownloadItem, IpcMain } from 'electron'
import { LinkedList } from '@/core/tools/dataStructure/LinkedList'

interface CarouselItemProps {
  item: any
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
    console.log(this.props.item)
    const carouselItem = {
      alia: this.props.item.别名 != undefined ? this.props.item.别名 : this.props.item.alia,
      pres: this.props.item.导演 != undefined ? this.props.item.导演 : this.props.item.pres,
      actors: this.props.item.主演 != undefined ? this.props.item.主演 : this.props.item.actors,
      cate: this.props.item.类型 != undefined ? this.props.item.类型 : this.props.item.cate,
      region: this.props.item.地区 != undefined ? this.props.item.地区 : this.props.item.region,
      lang: this.props.item.语言 != undefined ? this.props.item.语言 : this.props.item.lang,
      showtime: this.props.item.上映 != undefined ? this.props.item.上映 : this.props.item.showtime,
      leng: this.props.item.片长 != undefined ? this.props.item.片长 : this.props.item.leng,
      update: this.props.item.更新 != undefined ? this.props.item.更新 : this.props.item.update,
      totalfreq: this.props.item.总播放量 != undefined ? this.props.item.总播放量 : this.props.item.totalfreq,
      todayfreq:
        this.props.item.今日播放量 != undefined ? this.props.item.今日播放量 : this.props.item.todayfreq,
      totalrating:
        this.props.item.总评分数 != undefined ? this.props.item.总评分数 : this.props.item.totalrating,
      ratingfreq: this.props.item.评分次数 != undefined ? this.props.item.评分次数 : this.props.item.alia,
      name: this.props.item.name,
      cover: this.props.item.cover,
      rating: this.props.item.评分 | this.props.item.rating,
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

          <Rate disabled defaultValue={carouselItem.rating} className="rate" />
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
