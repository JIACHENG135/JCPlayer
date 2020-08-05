import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Row, Col } from 'antd'

import { green } from '@material-ui/core/colors'

import SpeedDial from './speed-dials'
import './play-accord.css'
import { ipcRenderer, IpcRendererEvent } from 'electron'

interface PlayAccordProps {
  cover: string
  item: any
  index: number
  name: string
  url: string
}

export default function PlayAccord(props: PlayAccordProps) {
  const { name, cover, item, index, url } = props

  const [realUrl, setRealUrl] = React.useState(url)
  ipcRenderer.on('Current url update', (event: IpcRendererEvent, msg: string) => {
    setRealUrl(msg)
  })
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
      },
      played: {
        position: 'fixed',
        height: '80%',
        width: '70%',
        backgroundColor: 'red',
        opacity: 0.8,
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
      },
      buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      buttonPlay: {
        backgroundColor: green[500],
        '&:hover': {
          backgroundColor: green[700],
        },
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
      },
      fabIcon: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      playIcon: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(2),
      },
      fabProgress: {
        color: green[500],
        position: 'absolute',
      },
      playProgress: {
        color: green[500],
        position: 'absolute',
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
    })
  )
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>
            {'第' + index + '集'}
            {item == realUrl ? '正在播放' : ''}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Row>
            <Col span={12}>
              <img style={{ width: '100%', borderRadius: '5px' }} src={cover} alt="unplash" />
            </Col>
            <Col span={12}>
              <div style={{ height: '100%' }}>
                <p>{name}</p>
                <p>{'第' + index + '集'}</p>

                <SpeedDial name={name} item={item} index={index}></SpeedDial>
              </div>
            </Col>
          </Row>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
