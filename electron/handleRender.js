import { ipcMain } from "electron"
import fs from 'fs'
import path from "path"

export function listenRender() {
    ipcMain.handle('read-file', handleReadFile)
    ipcMain.handle('save-file', handleSaveFile)
    ipcMain.handle('del-file', handleDelFile)
    ipcMain.handle('read-dir', handleReadDir)
}

function handleReadFile(event, pname) {
    console.log(pname)
    pname = path.join(__dirname, '..', pname)
    console.log(pname)
    return fs.readFileSync(pname, { encoding: "utf-8"})
}

function handleSaveFile(event, pname, str) {
    pname = path.join(__dirname, '..', pname)
    fs.writeFileSync(pname, str, { encoding: "utf-8"})
    return true
}

function handleDelFile(event, pname) {
    pname = path.join(__dirname, '..', pname)
    fs.unlinkSync(pname)
    return true
}

function handleReadDir(event, dirName) {
    pname = path.join(__dirname, '..', dirName)
    console.log(pname)
    return fs.readdirSync(pname)
}