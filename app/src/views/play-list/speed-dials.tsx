import React from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import SaveIcon from '@material-ui/icons/Save'
import ShareIcon from '@material-ui/icons/Share'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import FavoriteIcon from '@material-ui/icons/Favorite'
import { green } from '@material-ui/core/colors'
import CheckIcon from '@material-ui/icons/Check'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    speedDial: {
      position: 'absolute',
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(1),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(1),
        left: theme.spacing(2),
      },
    },
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
    fabIcon: {},
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
      position: 'relative',
    },
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
  })
)
const { remote, ipcRenderer } = window.require('electron')

interface SpeedDialsProps {
  item: any
  index: number
  name: string
}
export default function SpeedDials(props: SpeedDialsProps) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const { name, item, index } = props
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const n = new remote.Notification({
    icon: $tools.APP_ICON,
    title: 'Collected successfully',
    body: '成功收藏' + name + '第' + index + '集' + '到个人收藏',
    sound: 'Purr',
  })
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
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

  const handlePlay = () => {
    const win = remote.getCurrentWindow()
    win.webContents.send('Play this url', item)
  }
  const check = <FavoriteIcon style={{ color: success ? 'red' : '' }} />

  const save = <SaveIcon onClick={handleCollectClick} className={classes.fabIcon} />

  const actions = [
    {
      icon: success ? check : save,
      name: success ? 'Saved' : 'Save',
    },
    { icon: <PlayCircleFilledIcon onClick={handlePlay} />, name: 'Play' },
    { icon: <ShareIcon />, name: 'Share' },
    // { icon: check, name: 'Like' },
  ]
  return (
    <SpeedDial
      ariaLabel="SpeedDial example"
      className={classes.speedDial}
      hidden={false}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      direction="up"
      FabProps={{ size: 'small' }}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial>
  )
}
