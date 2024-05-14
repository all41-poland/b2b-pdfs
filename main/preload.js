import { contextBridge, ipcRenderer } from 'electron'

const handler = {
  send(channel, value) {
    ipcRenderer.send(channel, value)
  },
  invoke(channel, ...args) {
    return ipcRenderer.invoke(channel, ...args);
  },
  on(channel, callback) {
    const subscription = (_event, ...args) => callback(...args)
    ipcRenderer.on(channel, subscription)

    return () => {
      ipcRenderer.removeListener(channel, subscription)
    }
  },
}

contextBridge.exposeInMainWorld('ipc', handler)
