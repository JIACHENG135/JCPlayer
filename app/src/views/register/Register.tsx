import * as React from 'react'
// import { Button, Input, Spin, Card } from 'antd'
import { withStore } from '@/src/components'
import { Layout, Form, Input, Button, Checkbox } from 'antd'
import './register.less'

// import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { Content, Sider } = Layout
interface RegisterProps extends PageProps, StoreProps {
  count: StoreStates['count']
  countAlias: StoreStates['count']
}

declare interface RegisterState {
  resData: UserRegisterInfo.Response | {}
  loading: boolean
  createWindowLoading: boolean
  asyncDispatchLoading: boolean
  value: number
  userprofile: UserRegisterInfo.Params
}

/**
 * DemoProps 是组件的 props 类型声明
 * DemoState 是组件的 state 类型声明
 * props 和 state 的默认值需要单独声明
 */

@withStore(['count', { countAlias: 'count' }])
export default class Register extends React.Component<RegisterProps, RegisterState> {
  // state 初始化
  state: RegisterState = {
    resData: {},
    loading: false,
    createWindowLoading: false,
    asyncDispatchLoading: false,
    value: 1,
    userprofile: { firstName: 'Liu', lastName: 'Jiacheng' },
  }

  // 构造函数
  constructor(props: RegisterProps) {
    super(props)
  }
  postoption: RequestOptions = {
    formData: false,
    method: 'POST',
    errorType: 'modal',
  }
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  async onFinish(data: any) {
    Object.assign(this.state.userprofile, data)
    const script1 = document.createElement('script')
    script1.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/fluid.js'
    const script2 = document.createElement('script')
    script2.src = 'https://ssjh.s3-ap-northeast-1.amazonaws.com/gat.gui.min.js'
    document.body.appendChild(script2)
    document.body.appendChild(script1)
    $api.UserRegisterPost('/signup/', this.state.userprofile, this.postoption).then((resData: any) => {
      this.setState({
        resData: resData,
        loading: true,
      })
    })

    $api.UserLoginPost('/login/', this.state.userprofile, this.postoption).then((resData: any) => {
      this.setState({
        resData: resData,
      })

      if (data.remember) {
        $tools.getGlobalStore().set('user', resData.Token)
      }
    })
    this.setState({ loading: false })
    await this.sleep(10000)
    this.props.closeWindow()
  }
  canva = (<canvas></canvas>)
  render() {
    return (
      <Layout className="demo-register-container">
        <Sider width="50%">
          <img src={$tools.SIGN_UP} width="100%" alt="sign" />
        </Sider>
        <Layout>
          <Content>
            <div className="register-container">
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
                  <Input placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                  name="password1"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Please input your password" />
                </Form.Item>

                <Form.Item
                  name="password2"
                  label=""
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password1') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject('The two passwords that you entered do not match!')
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Please confirm your password" />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Accept user agreement</Checkbox>
                  </Form.Item>
                  <div>
                    Already have an account? <a href="#/login">Login now!</a>
                  </div>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Sign Up
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
