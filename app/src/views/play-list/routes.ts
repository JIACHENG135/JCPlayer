const routes: RouteConfig[] = [
  {
    key: 'PlayList',
    path: '/playlist',
    windowOptions: {
      title: 'Play list window',
      frame: process.platform == 'darwin' ? true : false,
      minHeight: 900,
      minWidth: 200,
      height: 1000,
      width: 300,
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
