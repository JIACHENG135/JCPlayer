const routes: RouteConfig[] = [
  {
    key: 'Trans',
    path: '/trans',
    windowOptions: {
      title: 'transparent window',
      frame: false,
      transparent: process.platform == 'darwin' ? true : false,
    },
    createConfig: {
      showSidebar: false,
      saveWindowBounds: false,
      single: true,
      // openDevTools: true,
    },
  },
]

export default routes
