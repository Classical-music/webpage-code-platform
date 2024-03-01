import { ipcMain } from "electron"
import fs from 'fs'
import path from "path"

export function listenRender() {
    ipcMain.on('save-file', handleSaveFile)
}

function handleSaveFile(event, pname, str) {
    pname = path.join(__dirname, '..', pname)
    fs.writeFileSync(pname, str)
}