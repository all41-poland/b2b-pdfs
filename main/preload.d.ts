import { ipcRenderer } from "electron";

export type IpcHandler = {
    send(channel: string, value: unknown): void;
    invoke: ipcRenderer['invoke'];
    on(channel: string, callback: Function): Function;
}

const handler: IpcHandler;