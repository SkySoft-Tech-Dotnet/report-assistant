const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const url = require("url");

let tray = null;
let win  = null;

function appStart() {
    createWindow();
    createTray();
}

function createTray(){
    // tray
    tray = new Tray(path.join(__dirname, `/dist/favicon.ico`));
    tray.setToolTip('Report Organizer');
    updateTrayMenu();

    tray.on('click', showWindow);
}

function updateTrayMenu() {

    if(tray){
        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Devtools',
                type:'checkbox',
                enabled: !!win,
                click: toggleDevTools
            },
            {
                label: 'Close',
                click: () => {
                    app.quit();
                }
            }
        ]);
        tray.setContextMenu(contextMenu)
    }
}

function createWindow() {

    if(!win){

        // set show - true if you need to open window after app start.
        win = new BrowserWindow({ width: 800, height: 600, show:false });

        // load the dist folder from Angular
        win.loadURL(
            url.format({
                pathname: path.join(__dirname, `/dist/index.html`),
                protocol: "file:",
                slashes: true
            })
        );

        // The following is optional and will open the DevTools:
        // win.webContents.openDevTools()

        win.on('closed', () => {
            win = null;
            updateTrayMenu();
        });

        updateTrayMenu();
    }
}

function toggleDevTools(){
    win && win.webContents && win.webContents.toggleDevTools();
}

function showWindow(){

    if(!win){
        createWindow();
    }

    if(!win.isVisible()){
        win && win.show();
    } else {
        win && win.hide();
    }

}

app.on("ready", appStart);

// callback should be empty if we need to leave main process alive after all window close
app.on("window-all-closed", () => {});

// initialize the app's main window
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});