import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import { Skeleton, Row, Col, Divider } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import ItemList from './ItemList'
import './book-section.less'
interface BookSectionProps {
  title: string
}

declare interface BookSectionState {
  resData: Array<any> | any
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  userprofile: UserLoginInfo.Params
  itemlist: any
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class BookSection extends React.Component<BookSectionProps, BookSectionState> {
  // state 初始化

  state: BookSectionState = {
    resData: {
      results: [{}],
      count: 1,
      next: '',
    },
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    userprofile: {
      username: '',
      password: '',
    },
    itemlist: '',
  }

  // 构造函数
  constructor(props: BookSectionProps) {
    super(props)
  }
  scrollDiv: any = React.createRef()
  postoption: RequestOptions = {
    formData: false,
    method: 'POST',
    errorType: 'modal',
  }
  componentDidMount() {
    this.requestTest('book/' + this.props.title)
  }

  sectiontitle = (
    <Divider className="book-divider" orientation="left" style={{ color: '#333', fontWeight: 'normal' }}>
      {this.props.title}
    </Divider>
  )
  requestTest(bookname: string) {
    this.setState({
      loading: true,
      resData: {
        results: [],
        count: 0,
        next: '',
      },
    })
    $api
      .queryTestInfo(
        bookname,
        { page: 1 },
        { headers: { Authorization: `Token ${$tools.getGlobalStore().get('user')}` } }
      )
      .then(resData => {
        this.setState({ resData: resData })
      })
      .catch(() => {
        $tools.createWindow('Login', {
          windowOptions: { title: 'Login', transparent: process.platform == 'darwin' ? true : false },
        })
      })
      .finally(() => {
        if (this.state.resData.results.length > 0) {
          this.setState({ loading: false })
        } else {
          this.setState({ loading: true })
        }
        // this.setState({ loading: false })
      })
  }
  requestRandomTest(bookname: string) {
    this.setState({
      loading: true,
      resData: {
        results: [],
      },
    })
    let randompage: number
    if (this.state.resData.length > 0) {
      randompage = Math.floor((Math.random() * this.state.resData.count) / 22 + 1)
    } else {
      randompage = 1
    }

    $api
      .queryTestInfo(
        bookname,
        { page: randompage },
        { headers: { Authorization: `Token ${$tools.getGlobalStore().get('user')}` } }
      )
      .then(resData => {
        this.setState({ resData: resData })
      })
      .catch(() => {
        $tools.createWindow('Login', {
          windowOptions: {
            title: 'Login',
            frame: false,
            transparent: process.platform == 'darwin' ? true : false,
          },
        })
      })
      .finally(() => {
        if (this.state.resData.results.length > 0) {
          this.setState({ loading: false })
        } else {
          this.setState({ loading: true })
        }
      })
  }
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    const syncicon = <SyncOutlined></SyncOutlined>
    const nosyncicon = <SyncOutlined spin></SyncOutlined>
    return (
      <section id="kexue" className="book-section">
        {this.state.resData.results.length > 0 ? this.sectiontitle : ''}

        <Skeleton loading={this.state.loading} key="Skeleton1" active className="skeleton-holder"></Skeleton>

        <ItemList items={this.state.resData.results}></ItemList>
        <Row>
          <Col span={24}>
            <span
              ref={this.props.title}
              className="sync-icon"
              onClick={this.requestRandomTest.bind(this, 'book/' + this.props.title)}
            >
              {this.state.loading ? nosyncicon : syncicon}
            </span>
          </Col>
        </Row>
      </section>
    )
  }
} // class Demo end
