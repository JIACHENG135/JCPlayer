const routes: RouteConfig[] = [
  {
    key: 'Register',
    path: '/register',
    windowOptions: {
      title: 'User Register',
      width: 600,
      height: 400,
      minWidth: 600,
      minHeight: 400,
      vibrancy: 'selection',
      transparent: process.platform == 'darwin' ? true : false,
    },
    createConfig: {
      showSidebar: false,
      // saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
