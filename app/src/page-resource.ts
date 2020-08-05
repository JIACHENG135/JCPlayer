/**
 * 页面资源集合，请不要在主进程中引用
 */

// 设为 undefined 将不会创建路由，一般用于重定向页面
export const Home = undefined

export const Demo = import('./views/demo/demo')
export const PageParams = import('./views/demo/page-params')
export const LogViewer = import('./views/log-viewer/log-viewer')
export const About = import('./views/about/about')

export const NoMatch = import('./views/no-match/no-match')

export const SearchPage = import('./views/search/SearchPage')

export const Register = import('./views/register/Register')

export const Login = import('./views/login/Login')

export const Trans = import('./views/trans-window/trans-window')

export const Details = import('./views/details/Details')

export const Preview = import('./views/preview/Preview')

export const User = import('./views/user/User')

export const Prepdf = import('./views/prepdf/Prepdf')

export const Fless = import('./views/fless-trans/fless-trans')

export const PlayList = import('./views/play-list/play-list')

// 同步引用，注意这不会出发 beforeRouter
export { default as AlertModal } from './views/modals/alert-modal'
