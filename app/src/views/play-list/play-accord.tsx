import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Row, Col } from 'antd'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  })
)
interface PlayAccordProps {
  cover: string
  item: any
  index: number
  name: string
}
export default function PlayAccord(props: PlayAccordProps) {
  const classes = useStyles()
  const { name, cover, item, index } = props
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Row>
              <Col span={12}>
                <img style={{ width: '100%', borderRadius: '5px' }} src={cover} alt="unplash" />
              </Col>
              <Col span={12}>
                {name}
                {'第' + index + '集'}
              </Col>
            </Row>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
