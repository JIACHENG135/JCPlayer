import { Notification, BrowserWindow, dialog, remote, MessageBoxOptions } from 'electron'
/**
 * 发生接口发生错误时的处理
 * 注意这是运行在主进程中的方法,请不要使用 document api
 * @param err
 * @param sendData
 * @param options
 */
export async function errorAction(err: any, sendData: any, options: RequestOptions) {
  const { code, message } = err
  const { errorType } = options

  $tools.log.error(`[request:${code}] [${errorType}]`, err)

  switch (code) {
    // 跳转到未登录页
    case 30000:
      // ...
      break

    // 无权限跳转
    case 30002:
      // ...
      break

    default:
      const title = `Request Error: [${code}]`
      if (errorType === 'notification') {
        const n = new Notification({
          icon: $tools.APP_ICON,
          title,
          body: message,
        })
        n.show()
      } else {
        await $tools.createWindow('AlertModal', {
          windowOptions: { modal: true, parent: BrowserWindow.getFocusedWindow() || undefined, title },
          query: {
            type: 'error',
            title: 'User information is not valid',
            message: message.username || message.password1 || message.password2 || message.email || message,
          },
        })
      }
      break
  }
}

export async function ejectDialog(messageBoxOptions: MessageBoxOptions) {
  await dialog.showMessageBox(remote.getCurrentWindow(), messageBoxOptions)
}

export async function successAction(title: string, message: string) {
  const n = new Notification({
    icon: $tools.APP_ICON,
    title,
    body: message,
    sound: 'Purr',
  })
  n.show()
}
