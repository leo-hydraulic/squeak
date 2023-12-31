if(require('electron-squirrel-startup')) return;
const { app, BrowserWindow } = require('electron')
require('update-electron-app')({
  updateInterval: '5 minutes',
})
const log = require('electron-log');

function createWindow () {
  log.info("about to start: %s\n%s\n%s", process.argv, process.env, process);
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('index.html')
  const version = app.getVersion()
  win.webContents.executeJavaScript(`
    const elem = document.querySelector('#app-version');
    elem.textContent = '${version}';
  `);
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
