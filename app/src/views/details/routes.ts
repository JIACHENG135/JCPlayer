const routes: RouteConfig[] = [
  {
    key: 'Details',
    path: '/details',
    windowOptions: {
      width: 800,
      height: 380,
      frame: false,
      title: 'Details',
      // titleBarStyle: 'customButtonsOnHover',
      transparent: process.platform == 'darwin' ? true : false,
      resizable: true,
    },
    createConfig: {
      showTitlebar: false,
      showSidebar: false,
      hideMenus: true,
      saveWindowBounds: false,
    },
  },
]

export default routes
