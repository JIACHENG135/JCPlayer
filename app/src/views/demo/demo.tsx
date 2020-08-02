import * as React from 'react'
import Carousel from 'react-spring-3d-carousel'
import { config } from 'react-spring'
import { v4 as uuidv4 } from 'uuid'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import './demo.less'
import PerfectScrollbar from 'react-perfect-scrollbar'
// import 'antd/dist/antd.css'

import 'react-multi-carousel/lib/styles.css'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './demo.less'

interface DemoProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface DemoState {
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  goToSlide: number
  offsetRadius: number
  showNavigation: boolean
  config: any
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class Demo extends React.Component<DemoProps, DemoState> {
  // state 初始化
  state: DemoState = {
    // resData: {},
    createWindowLoading: false,
    asyncDispatchLoading: false,
    goToSlide: 0,
    offsetRadius: 2,
    showNavigation: true,
    config: config.gentle,
  }
  scrollDivScience: any = React.createRef()
  scrollDivHistory: any = React.createRef()
  scrollDivWenxue: any = React.createRef()
  scrollDivBio: any = React.createRef()
  // 构造函数
  constructor(props: DemoProps) {
    super(props)
  }

  scrollSmoothHandlerScience = () => {
    this.scrollDivScience.current.scrollIntoView({ behavior: 'smooth' })
  }
  scrollSmoothHandlerHistory = () => {
    this.scrollDivHistory.current.scrollIntoView({ behavior: 'smooth' })
  }

  scrollSmoothHandlerWenxue = () => {
    this.scrollDivWenxue.current.scrollIntoView({ behavior: 'smooth' })
  }
  scrollSmoothHandlerBio = () => {
    this.scrollDivBio.current.scrollIntoView({ behavior: 'smooth' })
  }
  onChangeInput = () => {}
  render() {
    const slides = [
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/800/801/?random" alt="1" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/800/802/?random" alt="2" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/600/803/?random" alt="3" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/800/500/?random" alt="4" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/800/804/?random" alt="5" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/500/800/?random" alt="6" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/800/600/?random" alt="7" />,
      },
      {
        key: uuidv4(),
        content: <img src="https://picsum.photos/805/800/?random" alt="8" />,
      },
    ].map((slide, index) => {
      return { ...slide, onClick: () => this.setState({ goToSlide: index }) }
    })
    return (
      <PerfectScrollbar>
        <div style={{ width: '80%', height: '500px', margin: '0 auto' }}>
          <Carousel
            slides={slides}
            goToSlide={this.state.goToSlide}
            offsetRadius={this.state.offsetRadius}
            showNavigation={this.state.showNavigation}
            animationConfig={this.state.config}
          />
          <div
            style={{
              margin: '0 auto',
              marginTop: '2rem',
              width: '50%',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <div>
              <label>Go to slide: </label>
              <input name="goToSlide" onChange={this.onChangeInput} />
            </div>
            <div>
              <label>Offset Radius: </label>
              <input name="offsetRadius" onChange={this.onChangeInput} />
            </div>
            <div>
              <label>Show navigation: </label>
              <input
                type="checkbox"
                checked={this.state.showNavigation}
                name="showNavigation"
                onChange={e => {
                  this.setState({ showNavigation: e.target.checked })
                }}
              />
            </div>
            <div>
              <button
                onClick={() => {
                  this.setState({ config: config.gentle })
                }}
                disabled={this.state.config === config.gentle}
              >
                Gentle Transition
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  this.setState({ config: config.slow })
                }}
                disabled={this.state.config === config.slow}
              >
                Slow Transition
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  this.setState({ config: config.wobbly })
                }}
                disabled={this.state.config === config.wobbly}
              >
                Wobbly Transition
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  this.setState({ config: config.stiff })
                }}
                disabled={this.state.config === config.stiff}
              >
                Stiff Transition
              </button>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
    )
  }
}
