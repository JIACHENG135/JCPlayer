import { app, Tray, BrowserWindow, globalShortcut, clipboard, screen, ipcMain } from 'electron'

import { creatAppTray } from './tray'
import Store from 'electron-store'
import less, { options } from 'less'
import { autoUpdater } from 'electron-updater'

$tools.log.info(`Application <${$tools.APP_NAME}> launched.`)

let tray: Tray

app.allowRendererProcessReuse = true

ipcMain.on('Apply Slow Down', (event: any, mes: any) => {
  $tools.windowList.get('Details')?.webContents.send('Slow Down', mes)
})
autoUpdater.setFeedURL('https://ssjh.s3-ap-northeast-1.amazonaws.com/download')
autoUpdater.checkForUpdates()
autoUpdater.on('error', (error: any) => {
  $tools.windowList.get('SearchPage')?.webContents.send('CheckUpdateResult', error)
  $tools.log.info(error)
})
autoUpdater.on('checking-for-updater', (error: any) => {
  $tools.windowList.get('SearchPage')?.webContents.send('CheckUpdateResult', error)
  $tools.log.info('checking for updater')
})
autoUpdater.on('update-available', (error: any) => {
  $tools.windowList.get('SearchPage')?.webContents.send('CheckUpdateResult', 'Update available')
  $tools.log.info('Update available')
  autoUpdater.quitAndInstall()
})
autoUpdater.on('update-not-available', (error: any) => {
  $tools.windowList.get('SearchPage')?.webContents.send('CheckUpdateResult', 'Update not available')
  $tools.log.info('Update not available')
})
app.on('ready', () => {
  tray = creatAppTray()
  // $tools.getGlobalSto§§re().set('MyTheme', 6)

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
