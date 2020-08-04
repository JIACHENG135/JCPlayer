import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Grow from '@material-ui/core/Grow'

import { Row, Col } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import Item from '../../demo/Item'
import './book-row.less'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 180,
    },
    container: {
      display: 'flex',
    },
    paper: {
      margin: theme.spacing(1),
    },
    svg: {
      width: 100,
      height: 100,
    },
    polygon: {
      fill: theme.palette.common.white,
      stroke: theme.palette.divider,
      strokeWidth: 1,
    },
  })
)

interface ItemRowProps {
  items: Array<any>
  grid: number
}
export default function ItemRow(props: ItemRowProps) {
  const { items, grid } = props

  let fillCol

  const span = Math.floor(24 / grid)
  const checked = $tools.getGlobalStore().get('renderItems')
  const dynbookarea = items.map(item => (
    <Grow key={uuidv4()} in={true} style={{ transformOrigin: '0 0 0' }} {...(checked ? { timeout: 1000 } : {})}>
      <Col key={uuidv4()} span={span}>
        <Item item={item} key={uuidv4()}></Item>
      </Col>
    </Grow>
  ))
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
        {checked ? dynbookarea : bookarea}
        {fillCol}
      </Row>
    </div>
  )
}
