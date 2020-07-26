import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import Store from 'electron-store'
import { Layout, Form, Input, Button, Checkbox } from 'antd'
import './login.module.less'
import './canvas.less'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Content, Sider } = Layout
const store = new Store<any>()
interface LoginProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface LoginState {
  resData: UserLoginInfo.Response | {}
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  userprofile: UserLoginInfo.Params
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class Login extends React.Component<LoginProps, LoginState> {
  // state 初始化
  state: LoginState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    userprofile: {
      username: '',
      password: '',
    },
  }

  // 构造函数
  constructor(props: LoginProps) {
    super(props)
  }
  postoption: RequestOptions = {
    formData: false,
    method: 'POST',
    errorType: 'modal',
  }
  onFinish(data: any) {
    this.handleLogin(data)
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  async handleLogin(data: any) {
    this.setState({ loading: true })
    Object.assign(this.state.userprofile, data)
    const script1 = document.createElement('script')
    script1.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/fluid.js'
    const script2 = document.createElement('script')
    script2.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/gat.gui.min.js'
    document.body.appendChild(script2)
    document.body.appendChild(script1)
    // await this.sleep(200)
    await $api.UserLoginPost('/login/', this.state.userprofile, this.postoption).then((resData: any) => {
      this.setState({
        resData: resData,
      })

      if (data.remember) {
        store.set('user', resData.Token)
      }
    })
    await this.sleep(2000)
    this.setState({ loading: false })
    this.props.closeWindow()
  }
  canva = (<canvas></canvas>)
  image = (<img src={$tools.SIGN_UP} width="100%" alt="sign" />)
  render() {
    // const { resData, loading, createWindowLoading, asyncDispatchLoading } = this.state
    // const { count: reduxCount, countAlias } = this.props
    return (
      <Layout className="demo-login-container">
        <Sider width="50%" className="side-bar">
          {this.image}
        </Sider>
        <Layout>
          <Content>
            <div className="login-container">
              {this.state.loading ? this.canva : ''}
              <Form
                name="normal_login"
                className={`login-form ${this.state.loading ? 'transparent' : ''}`}
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish.bind(this)}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <div>
                    <a className="login-form-forgot" href="">
                      Forgot password
                    </a>
                  </div>

                  <a href="#/register">Register now!</a>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
} // class Demo end
