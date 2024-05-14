import { contextBridge, ipcRenderer } from 'electron'
import type { ReadSettingsEventHandler } from './appLogic/settings';
import type { SaveFileEventHandler } from './appLogic/files';

export type InvokeEventTypes =
  ReadSettingsEventHandler |
  SaveFileEventHandler

export type IpcHandler = {
  send(channel: string, value: unknown): void;
  invoke(channel: ReadSettingsEventHandler['channel']): ReadSettingsEventHandler['returnType'];
  invoke(channel: SaveFileEventHandler['channel'], payload: SaveFileEventHandler['payload']): SaveFileEventHandler['returnType'];
  on(channel: string, callback: Function): Function;
}

const handler: IpcHandler = {
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
