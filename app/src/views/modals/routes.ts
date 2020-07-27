const routes: RouteConfig[] = [
  {
    path: '/alert-modal',
    key: 'AlertModal',
    windowOptions: {
      title: 'Alert',
      width: 460,
      height: 300,
      resizable: false,
      vibrancy: 'titlebar',
      transparent: process.platform == 'darwin' ? true : false,
      frame: process.platform == 'darwin' ? true : false,
    },
    createConfig: {
      showTitlebar: false,
      hideMenus: true,
    },
  },
]

export default routes
