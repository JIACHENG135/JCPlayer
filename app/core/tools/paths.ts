import path from 'path'
import { app } from 'electron'
import Store from 'electron-store'
/** 当前应用程序所在目录 */
export const APP_PATH: string = app.getAppPath()

/** 当前用户的应用数据文件夹 */
export const APP_DATA_PATH: string = app.getPath('appData')

/** 储存你应用程序设置文件的文件夹 */
export const USER_DATA_PATH: string = app.getPath('userData')

/** 应用程序的日志文件夹 */
export const LOGS_PATH: string =
  process.platform === 'darwin'
    ? path.resolve(app.getPath('logs'), `../${app.name}`)
    : path.resolve(USER_DATA_PATH, 'logs')

/** 资源文件夹 */
export const ASSETS_PATH: string =
  process.env.NODE_ENV === 'development' ? 'assets' : path.resolve(APP_PATH, './assets')

/**
 * 转换资源路径
 * @param pathStr
 */
export function asAssetsPath(pathStr: string) {
  return path.join(ASSETS_PATH, pathStr)
}

/**
 * 转换绝对路径
 * @param pathStr
 */
export function asAbsolutePath(pathStr: string) {
  return path.resolve(APP_PATH, pathStr)
}
const store = new Store<any>()
export function getTheme() {
  return store.get('MyTheme')
}
export function setTheme(n: number) {
  store.set('MyTheme', n)
}
