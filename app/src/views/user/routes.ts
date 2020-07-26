const routes: RouteConfig[] = [
  {
    key: 'User',
    path: '/user',
    windowOptions: {
      title: 'User',
      width: 600,
      height: 600,
      frame: false,
      transparent: true,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      // openDevTools: true,
    },
  },
]

export default routes
