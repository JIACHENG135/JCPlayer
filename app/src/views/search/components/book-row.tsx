import React from 'react'
import Item from '../../demo/Item'
import 'react-multi-carousel/lib/styles.css'
import { Row, Col } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import './book-row.less'
interface BookRowItemProps {
  items: Array<any>
  grid: number
}

export default class BookRow extends React.Component<BookRowItemProps> {
  constructor(props: BookRowItemProps) {
    super(props)
  }
  render() {
    let fillCol
    const { items } = this.props
    const span = Math.floor(24 / this.props.grid)
    const bookarea = items.map(item => (
      <Col key={uuidv4()} span={span}>
        <Item item={item} key={uuidv4()}></Item>
      </Col>
    ))
    if (items.length % 2 != 0) {
      fillCol = <Col key={uuidv4()} flex="auto"></Col>
    } else {
      fillCol = ''
    }

    return (
      <div className="book-row-container">
        <Row className="book-row" gutter={[24, 16]}>
          {bookarea}
          {fillCol}
        </Row>
      </div>
    )
  }
}
