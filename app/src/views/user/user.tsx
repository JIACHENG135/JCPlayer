import * as React from 'react'

import { Button, Row, Col, Divider } from 'antd'
import './user.less'
import BookArea from './components/book-area'
import PerfectScrollbar from 'react-perfect-scrollbar'
interface UserProps extends PageProps, StoreProps {}

declare interface UserState {
  createWindowLoading: boolean
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */
const { ipcRenderer } = window.require('electron')
export default class User extends React.Component<UserProps, UserState> {
  // state 初始化
  state: UserState = {
    createWindowLoading: false,
  }

  // 构造函数
  constructor(props: UserProps) {
    super(props)
  }
  componentDidMount() {
    $tools.getGlobalStore().set('renderItems', true)
  }
  // componentWillUnmount() {
  //   ipcRenderer.on('Search Page Speed Up', () => {
  //     $tools.getGlobalStore().set('renderItems', false)
  //     this.setState(() => ({
  //       createWindowLoading: true,
  //     }))
  //   })
  //   ipcRenderer.on('Search Page Slow Down', () => {
  //     $tools.getGlobalStore().set('renderItems', false)
  //     this.setState(() => ({
  //       createWindowLoading: false,
  //     }))
  //   })
  // }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  render() {
    const theme = $tools.getGlobalStore().get('MyTheme', 1)
    const { createWindowLoading } = this.state
    const domain =
      process.platform == 'darwin'
        ? $tools.ASSETS_PATH + '/themes/'
        : 'https://jiacheng135.github.io/Theme/assets/themes/'
    const bimage = createWindowLoading
      ? domain + theme + '/Fluid-10s-3000px.svg'
      : domain + theme + '/Fluid-10s-3000px.png'
    const histData: any = $tools.getGlobalStore().get('hist', new Array<any>())
    return (
      <PerfectScrollbar>
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
                  src="https://source.unsplash.com/random"
                  style={{ position: 'relative', top: '-50px' }}
                ></img>
              </Col>
              <Col span={16} className="avatar-container">
                <Row>
                  <Col>
                    <span className={'user-name'}>JCPlayer User</span>
                    <span className={'user-intro'}>He said nothing</span>
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
                        <span>Education</span>
                        <div className="vertical-divider"></div>
                        <span>Institution</span>
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
                        <span>Occupation</span>
                        <div className="vertical-divider"></div>
                        <span>Title, City</span>
                      </span>
                      <span className="education-experience"></span>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col>
                <div className={'tail-col'}>
                  <span>
                    <Button
                      type="primary"
                      href="https://www.zhihu.com/people/5602f1ee57a5cf124ec122e995d46e5f"
                      target="_blank"
                    >
                      {' '}
                      Follow Him/Her
                    </Button>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
          <Divider orientation="left">History</Divider>
          <div className="section">
            <BookArea items={histData}></BookArea>
          </div>
        </div>
      </PerfectScrollbar>
    )
  }
} // class Demo end
