const routes: RouteConfig[] = [
  {
    key: 'Wall',
    path: '/wall',
    windowOptions: {
      title: 'wallpaper',
      frame: false,
      transparent: process.platform == 'darwin' ? true : false,
      type: 'dekstop',
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
