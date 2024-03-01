const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('sendToMain', {
    saveFile: (pname, str) => {
        return ipcRenderer.send('save-file', pname, str)
    }
})
