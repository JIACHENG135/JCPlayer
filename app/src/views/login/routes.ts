const routes: RouteConfig[] = [
  {
    key: 'Login',
    path: '/login',
    windowOptions: {
      title: 'User login',
      width: 600,
      height: 400,
      // minWidth: 600,
      // minHeight: 400,

      frame: false,
      transparent: true,
    },
    createConfig: {
      showSidebar: false,
      // saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
