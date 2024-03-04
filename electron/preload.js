const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('request', {
    readFile: (pname) => {
        return ipcRenderer.invoke('read-file', pname)
    },
    saveFile: (pname, str) => {
        return ipcRenderer.invoke('save-file', pname, str)
    },
    delFile: (pname) => {
        return ipcRenderer.invoke('del-file', pname)
    },
    readDir: (dirName) => {
        return ipcRenderer.invoke('read-dir', dirName)
    }
})