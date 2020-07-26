import * as React from 'react'

// import { ReactReader } from 'react-reader'
// import Store from 'electron-store'
// import { Avatar, Badge } from 'antd'
import { Button, Row, Col } from 'antd'
// import { AimOutlined } from '@ant-design/icons'
import './user.less'
// const { Content } = Layout
interface UserProps extends PageProps, StoreProps {}

declare interface UserState {}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
// const store = new Store<any>()

export default class User extends React.Component<UserProps, UserState> {
  // state 初始化
  state: UserState = {}

  // 构造函数
  constructor(props: UserProps) {
    super(props)
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  render() {
    // const { count: reduxCount, countAlias } = this.props
    return (
      <div className="user-profile" style={{ height: '100%' }}>
        <Row>
          <Col>
            <img
              className={'bgbadge'}
              src={`${$tools.AssetsPath('profile-img/background.jpg')}`}
              width={'100%'}
            ></img>
          </Col>
        </Row>
        <div className="section">
          <Row>
            <Col span={4} className="avatar-container">
              <img
                className="bgimg"
                src={`${$tools.AssetsPath('profile-img/background.jpg')}`}
                style={{ position: 'relative', top: '-50px' }}
              ></img>
            </Col>
            <Col span={16} className="avatar-container">
              <Row>
                <Col>
                  <span className={'user-name'}>ocn2mon</span>
                  <span className={'user-intro'}>接受，硬刚，成长</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className={'education-icon'}>
                    <svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
                      <path
                        d="M12 4L1 7.94v.588l4.153 2.73v5.166C5.158 16.758 8.028 20 12 20c3.972 0 6.808-3.116 6.85-3.576l.006-5.163 4.129-2.733.015-.586L12 4z"
                        fill="evenodd"
                      ></path>
                    </svg>
                  </span>
                </Col>
                <Col>
                  <div>
                    <span className="work-experience">
                      <span>HUST</span>
                      <div className="vertical-divider"></div>
                      <span>TAMU</span>
                    </span>
                    <span className="education-experience"></span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className={'education-icon'}>
                    <svg fill="currentColor" viewBox="0 0 24 24" width="1.2em" height="1.2em">
                      <path
                        d="M17 6.998h3.018c1.098 0 1.975.89 1.982 2.002v10a1.993 1.993 0 0 1-1.987 2H3.98A1.983 1.983 0 0 1 2 19l.009-10.003c0-1.11.873-1.999 1.971-1.999L7 7V5c.016-1.111.822-2 2-2h6c.98 0 1.86.889 2 2v1.998zM9 7h6V5.5s0-.5-.5-.5h-5c-.504 0-.5.5-.5.5V7z"
                        fill="evenodd"
                      ></path>
                    </svg>
                  </span>
                </Col>
                <Col>
                  <div>
                    <span className="work-experience">
                      <span>SDE</span>
                      <div className="vertical-divider"></div>
                      <span>Intern at ZhuanYao</span>
                    </span>
                    <span className="education-experience"></span>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col className="avatar-container">
              <div className={'tail-col'}>
                <span>
                  <Button
                    type="primary"
                    href="https://www.zhihu.com/people/5602f1ee57a5cf124ec122e995d46e5f"
                    target="_blank"
                  >
                    {' '}
                    关注他
                  </Button>
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
} // class Demo end
