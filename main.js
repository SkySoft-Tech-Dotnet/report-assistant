const {app, BrowserWindow, Tray, Menu} = require('electron')
const path = require('path')
const url = require('url')

let win;
let tray;

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/ReportsOrganizer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  win.on('closed', () => {
    win = null
  })
  tray = new Tray('D:\icon.png');
  tray.setToolTip('Tool Tip');
  tray.setContextMenu(Menu.buildFromTemplate(
    [
      {
        label: 'Add Item',
        click: () => {
          console.log("click");
        },
      }, 
      {
          type: 'separator'
      }, 
      {
        label: 'Exit',
        click: () => {
          win.destroy()
          app.quit()
        },
      }
    ]
  ))
  tray.on('double-click', () => {
    win.show()
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})