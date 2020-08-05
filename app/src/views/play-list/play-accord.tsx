import React, { useState } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Row, Col } from 'antd'
import Fab from '@material-ui/core/Fab'
import CheckIcon from '@material-ui/icons/Check'
import SaveIcon from '@material-ui/icons/Save'
import { green } from '@material-ui/core/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import SpeedDial from './speed-dials'
import './play-accord.css'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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
interface PlayAccordProps {
  cover: string
  item: any
  index: number
  name: string
}
const { remote } = window.require('electron')
export default function PlayAccord(props: PlayAccordProps) {
  const classes = useStyles()
  const { name, cover, item, index } = props
  const [loading, setLoading] = React.useState(false)
  const [play, setPlay] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const n = new remote.Notification({
    icon: $tools.APP_ICON,
    title: 'Collected successfully',
    body: '成功收藏' + name + '第' + index + '集' + '到个人收藏',
    sound: 'Purr',
  })
  const handleCollectClick = () => {
    if (!loading) {
      setSuccess(false)
      setLoading(true)
      setTimeout(() => {
        setSuccess(true)
        setLoading(false)
        n.show()
      }, 2000)
    }
  }
  const handlePlayClick = () => {
    if (!play) {
      setSuccess(false)
      setPlay(true)
      setTimeout(() => {
        setSuccess(true)
        setPlay(false)
        n.show()
      }, 2000)
    }
  }
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>{'第' + index + '集'}</Typography>
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

                <SpeedDial></SpeedDial>
              </div>
            </Col>
          </Row>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
