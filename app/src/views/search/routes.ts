const routes: RouteConfig[] = [
  {
    key: 'SearchPage',
    path: '/search',
    createConfig: {
      single: true,
    },
    windowOptions: {
      resizable: true,
      vibrancy: process.platform == 'darwin' ? 'light' : 'sidebar',
    },
  },
  {
    key: 'PageParams',
    path: '/page-params/:test',
  },
]

export default routes
