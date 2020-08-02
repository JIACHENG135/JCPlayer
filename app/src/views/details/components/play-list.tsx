import React from 'react'

import { v4 as uuidv4 } from 'uuid'
import './play-list.less'
import PlayRow from './play-row'

interface BookRowItemProps {
  adds: Array<any>
  cols: number
}

export default class PlayList extends React.Component<BookRowItemProps> {
  constructor(props: BookRowItemProps) {
    super(props)
  }

  render() {
    let playcol: Array<any>
    const { adds, cols } = this.props
    const playarea = new Array<any>()

    const ct = Math.floor(adds.length / cols)
    let i = 0
    while (i < ct) {
      console.log(adds.slice(i * cols, (i + 1) * cols))
      playarea.push(
        <PlayRow
          key={uuidv4()}
          items={adds.slice(i * cols, (i + 1) * cols)}
          cols={Math.floor(24 / cols)}
          start={i * cols}
        ></PlayRow>
      )
      i += 1
    }

    if (i * cols < adds.length) {
      playarea.push(
        <PlayRow
          key={uuidv4()}
          items={adds.slice(i * cols)}
          cols={Math.floor(24 / cols)}
          start={i * cols}
        ></PlayRow>
      )
    }

    return <div className="play-row-container">{playarea}</div>
  }
}
