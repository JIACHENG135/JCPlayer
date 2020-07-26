const routes: RouteConfig[] = [
  {
    key: 'Trans',
    path: '/trans',
    windowOptions: {
      title: 'transparent window',
      frame: false,
      transparent: true,
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
