import { app, Tray, globalShortcut, ipcMain } from 'electron'

import { creatAppTray } from './tray'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

ipcMain.on('Apply Slow Down', (event: any, mes: any) => {
  $tools.windowList.get('Details')?.webContents.send('Slow Down', mes)
})

app.on('ready', () => {
  tray = creatAppTray()
  // $tools.getGlobalStore().set('MyTheme', 6)

  globalShortcut.register('CommandOrControl+T+1', () => {
    $tools.setTheme(1)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+T+2', () => {
    $tools.setTheme(2)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+T+3', () => {
    $tools.setTheme(3)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+T+4', () => {
    $tools.setTheme(4)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+T+5', () => {
    $tools.setTheme(5)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  globalShortcut.register('CommandOrControl+T+7', () => {
    $tools.setTheme(6)
    $tools.windowList.get('SearchPage')?.webContents.reload()
  })

  // globalShortcut.register('CommandOrControl+p', () => {
  //   const win = $tools.windowList.get('Trans')
  //   const bound = win?.getBounds()
  //   let x, y, width, height
  //   if (bound) {
  //     x = bound.x
  //     y = bound.y
  //     width = bound.width
  //     height = bound.height
  //     $tools.createWindow('PlayList', {
  //       windowOptions: { x: x + width, y: y, maxHeight: height, width: 300 },
  //     })
  //   }
  // })

  $tools.createWindow('SearchPage')
})

app.on('activate', () => {
  if (process.platform == 'darwin') {
    // $tools.createWindow('About')
  }
})

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('before-quit', () => {
  $tools.log.info(`Application <${$tools.APP_NAME}> has exited normally.`)
  if (process.platform === 'win32') {
    tray.destroy()
  }
})
