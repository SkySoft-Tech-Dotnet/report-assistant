const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const url = require("url");

let tray = null;
let win;
let isForceClose = false;

function appStart() {
    createWindow();
    createTray();
}

function createTray(){
    // tray
    tray = new Tray(path.join(__dirname, `/dist/favicon.ico`));
    tray.setToolTip('Report Organizer');
    updateTrayMenu();

    tray.on('click', () => {
        win.show();
    });
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
                    isForceClose = true;
                    win.close();
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

        // hide window instead of close
        win.on('close', (e) => {

            if(!isForceClose){
                e.preventDefault();
                win.hide();
            }
        });

        updateTrayMenu();
    }
}

function toggleDevTools(){
    win && win.webContents && win.webContents.toggleDevTools();
}

function showWindow(){

    if(!win.isVisible()){
        win && win.show();
    } else {
        win && win.hide();
    }
}

app.on("ready", appStart);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// initialize the app's main window
app.on("activate", () => {
    if (win === null) {
        createWindow();
    }
});