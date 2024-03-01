const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const { listenRender } = require('./handleRender')

const createWindow = (_) => {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '../electron/preload.js')
    }
  });
  win.maximize()
  win.webContents.openDevTools()
  win.loadURL(process.argv[2])
};

app.whenReady().then((_) => {
  listenRender()
  createWindow()

  app.on('activate', _ => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', _ => {
  if (process.platform !== 'darwin') app.quit()
});
