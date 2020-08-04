import React from 'react'

import { Row, Col, Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import './play-row.less'

import { PlayCircleOutlined } from '@ant-design/icons'
import { ipcRenderer } from 'electron'
interface PlayRowProps {
  cols: number
  items: Array<any>
  start: number
}

export default class PlayRow extends React.Component<PlayRowProps> {
  constructor(props: PlayRowProps) {
    super(props)
  }
  play(add: string) {
    $tools.getGlobalStore().set('play-url', add)

    $tools.windowList.get('Details')?.webContents.send('Speed Up', 'You can speed up bgimage now')
    $tools
      .createWindow('Trans', {
        windowOptions: {
          title: 'Translating results',
          transparent: process.platform == 'darwin' ? true : false,
          minWidth: 200,
          minHeight: 200,
          width: 1500,
          height: 843.75,
          // titleBarStyle: 'customButtonsOnHover',
          vibrancy: process.platform == 'darwin' ? 'light' : 'light',
          resizable: true,
          frame: false,
          // maximizable: true,
        },
      })
      .finally(() => {
        ipcRenderer.send('Apply Slow Down')
      })
  }
  render() {
    const { cols, items, start } = this.props
    const colArea = items.map((add: string, ind: number) => {
      const exist = $tools.getGlobalStore().get(add, undefined)
      return (
        <Col key={uuidv4()} span={cols} className="playlist">
          <span key={uuidv4()} onClick={this.play.bind(this, add)}>
            <Button
              key={uuidv4()}
              type="primary"
              icon={<PlayCircleOutlined></PlayCircleOutlined>}
              style={{ opacity: exist ? 0.5 : 1 }}
            ></Button>
            <span key={uuidv4()} className="ep-num" style={{ paddingLeft: '5px' }}>
              第{start + ind + 1}集
            </span>
          </span>
        </Col>
      )
    })
    // if (items.length % 2 != 0) {
    //   fillCol = <Col key={uuidv4()} flex="auto"></Col>
    // } else {
    //   fillCol = ''
    // }
    return (
      <div key={uuidv4()} className="play-row-container">
        <Row key={uuidv4()}>{colArea}</Row>
      </div>
    )
  }
}
