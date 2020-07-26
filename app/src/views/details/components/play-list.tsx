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
    playcol = new Array<any>()
    let ct = 0
    adds.map((add: any, ind: number) => {
      if ((ind + 1) % (cols + 1) != 0) {
        playcol.push(add)
      } else {
        if (playcol.length > 0) {
          playarea.push(
            <PlayRow key={uuidv4()} items={playcol} cols={Math.floor(24 / cols)} start={ct}></PlayRow>
          )
        }
        playcol = new Array<any>()
        ct = ct + cols
      }
    })
    if (playcol.length > 0) {
      playarea.push(<PlayRow key={uuidv4()} items={playcol} cols={Math.floor(24 / cols)} start={ct}></PlayRow>)
    }

    return <div className="play-row-container">{playarea}</div>
  }
}
