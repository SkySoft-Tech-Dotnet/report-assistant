import { app, BrowserWindow, Menu, Tray } from 'electron';
import * as path from 'path';
import * as url from 'url';

let tray:Tray = null;
let win:BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
let serve:boolean = args.some(val => val === '--serve');

function appStart():void {
    createWindow();
    createTray();
}

function createTray(){
    // tray
    if(serve){
        tray = new Tray(path.join(__dirname, `/src/assets/icons/tray/clock.ico`));
    } else {
        tray = new Tray(path.join(__dirname, `/dist/assets/icons/tray/clock.ico`));
    }

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


        if (serve) {
            // get dynamic version from localhost:4200
            require('electron-reload')(__dirname, {
                electron: require(`${__dirname}/node_modules/electron`)});
            win.loadURL('http://localhost:4200');
        } else {
            // load the dist folder from Angular
            win.loadURL(
                url.format({
                    pathname: path.join(__dirname, `/dist/index.html`),
                    protocol: "file:",
                    slashes: true,
                    //icon: path.join(__dirname, 'assets/icons/favicon.png')
                })
            );
        }


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