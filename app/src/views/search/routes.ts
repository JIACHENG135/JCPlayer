import { Hidden } from '@material-ui/core'

const routes: RouteConfig[] = [
  {
    key: 'SearchPage',
    path: '/search',
    createConfig: {
      single: true,
    },
    windowOptions: {
      resizable: true,
      vibrancy: process.platform == 'darwin' ? 'light' : 'sidebar',
      titleBarStyle: 'hidden',
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
