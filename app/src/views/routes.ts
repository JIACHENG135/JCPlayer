const routes: RouteConfig[] = [
  {
    key: 'Home',
    path: '/',
    redirect: { to: '/demo?form=home' },
    windowOptions: {
      title: 'App Home (redirect to demo)',
      transparent: process.platform == 'darwin' ? true : false,
      minHeight: 800,
      minWidth: 1000,
    },
    createConfig: {
      showSidebar: true,
      saveWindowBounds: true,
      // openDevTools: true,
    },
  },
]

export default routes
