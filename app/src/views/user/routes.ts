const routes: RouteConfig[] = [
  {
    key: 'User',
    path: '/user',
    windowOptions: {
      title: 'User',
      width: 600,
      height: 600,
      minHeight: 600,
      minWidth: 600,
      frame: false,
      transparent: process.platform == 'darwin' ? true : false,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      // openDevTools: true,
    },
  },
]

export default routes
