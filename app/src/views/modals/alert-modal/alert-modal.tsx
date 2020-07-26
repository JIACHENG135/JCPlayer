import React from 'react'
import { Button } from 'antd'

import './alert-modal.less'

interface AlertModalQuery {
  type: 'info' | 'warn' | 'error'
  title: string
  message: string[]
}

const TYPES_CONFIG = {
  info: {
    icon: <i className="fs-48 text-info ri-information-fill" />,
  },
  warn: {
    icon: <i className="fs-48 text-warn ri-alert-fill" />,
  },
  error: {
    icon: <i className="fs-48 text-error ri-close-circle-fill" />,
  },
}

export default class AlertModal extends React.Component<PageProps<{}, AlertModalQuery>> {
  get typesConfig() {
    const { type } = this.props.query
    return TYPES_CONFIG[type || 'info']
  }

  render() {
    const { title, message } = this.props.query
    return (
      <div className="alert-modal flex column">
        <div className="content flex-1 flex p-16">
          <div className="mr-16 mt-8">{this.typesConfig.icon}</div>
          <div className="flex-1 flex column">
            <h1 className="fs-24 text-title">{title}</h1>
            <ul>
              {message.map(item => (
                <li key={item} className="fs-14 text-gray flex-1 message-box">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer flex end">
          <Button
            type="primary"
            onClick={() => {
              this.props.closeWindow()
            }}
          >
            close
          </Button>
        </div>
      </div>
    )
  }
} // class AlertModal end
