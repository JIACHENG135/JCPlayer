import { MenuItemConstructorOptions } from 'electron'

export const trayMenus: MenuItemConstructorOptions[] = [
  {
    label: 'Help',
    submenu: [{ label: 'About', click: () => $tools.createWindow('About'), accelerator: 'Alt+Cmd+T' }],
  },
  { label: 'About', click: () => $tools.createWindow('About'), accelerator: 'Alt+Cmd+T' },
  { type: 'separator' },

  { label: 'Quit', role: 'quit' },
]
