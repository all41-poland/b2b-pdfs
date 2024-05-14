import { app, dialog, ipcMain } from 'electron';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const saveFile = async (blob, fileName) => {
    const res = await dialog.showSaveDialog({
        title: 'Select the File Path to save', 
        defaultPath: join(app.getPath('documents'), fileName), 
        // defaultPath: path.join(__dirname, '../assets/'), 
        buttonLabel: 'Save', 
        // Restricting the user to only Text Files. 
        filters: [ 
            { 
                name: 'Pdf Document', 
                extensions: ['pdf'] 
            }, ], 
        properties: [] 
    })

    if (res.canceled) {
        return "Cancelled";
    }

    await writeFile(
        res.filePath,
        Buffer.from(blob),
    );

    return "Ok";
}

ipcMain.handle('saveFile', async (e, data) => {
    const status = await saveFile(
        data.blob,
        data.fileName,
    );

    return status;
})