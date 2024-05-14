import { app, dialog, ipcMain } from 'electron';
import { existsSync } from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export type WriteDataType = Parameters<typeof writeFile>[1];

export const DOCUMENTS_PATH = join(app.getPath('documents'), 'b2b-pdfs');

export const ensureDirExists = async () => {
    const dirExists = existsSync(DOCUMENTS_PATH);
    if (!dirExists) {
        await mkdir(DOCUMENTS_PATH);
    }
}

export const selectFile = async () => {
    const res = await dialog.showOpenDialog({
        defaultPath: join(app.getPath('documents'), 'b2b-pdfs'), 
    })

    return res;
}

export const saveFile = async (
    data: WriteDataType | ArrayBuffer,
    fileName: string
) => {
    await ensureDirExists();

    const res = await dialog.showSaveDialog({
        defaultPath: join(app.getPath('documents'), 'b2b-pdfs', fileName), 
    })

    if (res.canceled || !res.filePath) {
        return "CANCELLED";
    }

    let modData = data;

    if (data instanceof ArrayBuffer) {
        modData = Buffer.from(data);
    }

    await writeFile(
        res.filePath,
        modData as WriteDataType,
    );

    return "OK";
}

export interface SaveFileEventHandler {
    channel: 'saveFile';
    payload: { fileName: string, data: WriteDataType | ArrayBuffer };
    returnType: Promise<{
      status: "CANCELLED",
    } | {
      status: "OK",
    }>
}

ipcMain.handle(
    'saveFile' as SaveFileEventHandler['channel'], 
    async (
        e,
        payload: SaveFileEventHandler['payload'],
    ) => {
    const status = await saveFile(
        payload.data,
        payload.fileName,
    );

    return { status };
})