const routes: RouteConfig[] = [
  {
    key: 'Register',
    path: '/register',
    windowOptions: {
      title: 'User Register',
      width: 600,
      height: 400,
      minWidth: 600,
      minHeight: 400,
      vibrancy: 'selection',
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
