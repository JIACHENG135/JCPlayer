const routes: RouteConfig[] = [
  {
    key: 'Prepdf',
    path: '/prepdf',
    windowOptions: {
      title: 'Prepdf',
      width: 1200,
      height: 600,
      frame: false,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      // openDevTools: true,
    },
  },
]

export default routes
