import ItemRow from '../../search/components/item-row'
import React from 'react'

import 'react-multi-carousel/lib/styles.css'
import { BrowserWindow } from 'electron'
import './book-area.css'
interface BookAreaItemProps {
  items: Array<any>
}
declare interface BookAreaState {
  cols: number
}
const { remote } = window.require('electron')
export default class BookArea extends React.Component<BookAreaItemProps> {
  constructor(props: BookAreaItemProps) {
    super(props)
  }
  state: BookAreaState = {
    cols: 6,
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
  componentDidMount() {
    const win: BrowserWindow = remote.getCurrentWindow()

    win.on('resize', this.throttle(this.onResize, 200).bind(this, win))
  }
  render() {
    let { items } = this.props
    const { cols } = this.state
    const bookblock = new Array<any>()

    let bookArray = new Array<any>()
    items = items.reverse()
    for (const book of items) {
      if (bookArray.length % cols == 0) {
        bookblock.push(<ItemRow items={bookArray} grid={cols}></ItemRow>)

        bookArray = new Array<any>()
      }
      bookArray.push(book)
    }
    if (bookArray.length > 0) {
      bookblock.push(<ItemRow items={bookArray} grid={cols}></ItemRow>)
    }
    const bookcont = bookblock.map((item, index) => {
      return <div key={index}>{item}</div>
    })

    return <div className="book-area-container">{bookcont}</div>
  }
}
