import {app, BrowserWindow, Menu, MenuItem, Tray} from 'electron';
import * as path from 'path';
import * as url from 'url';

let tray: Tray = null;
let win: BrowserWindow = null;

// detect serve mode
const args = process.argv.slice(1);
const serve: boolean = args.some(val => val === '--serve');

function appStart(): void {
    createWindow();
    createTray();
}

function createTray() {
    // tray
    if (serve) {
        tray = new Tray(path.join(__dirname, `/src/favicon.ico`));
    } else {
        tray = new Tray(path.join(__dirname, `/dist/favicon.ico`));
    }

    tray.setToolTip('Report Organizer');
    updateTrayMenu();

    tray.on('double-click', showWindow);
}

function updateTrayMenu() {

    if (tray) {

        const contextMenu = Menu.buildFromTemplate([
            {
                label: 'Open',
                click: showWindow
            },
            {
                type: 'separator'
            },
            {
                label: 'Add report',
                click: () => { }
            },
            {
                label: 'Add note',
                click: () => { }
            },
            {
                label: 'Pause notification',
                click: () => { }
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click: () => {
                    app.quit();
                }
            }
        ]);

        if (serve) {
            contextMenu.insert(0, new MenuItem({
                label: 'DevTools (for dev-build only)',
                type: 'checkbox',
                enabled: !!win,
                click: toggleDevTools
            }));
        }

        tray.setContextMenu(contextMenu);
    }
}

function createWindow() {

    if (!win) {

        // set show - true if you need to open window after app start.
        win = new BrowserWindow({width: 800, height: 600, show: false});

        if (serve) {
            // get dynamic version from localhost:4200
            require('electron-reload')(__dirname, {
                electron: require(`${__dirname}/node_modules/electron`)
            });
            win.loadURL('http://localhost:4200');
        } else {
            // load the dist folder from Angular
            win.loadURL(
                url.format({
                    pathname: path.join(__dirname, `/dist/index.html`),
                    protocol: 'file:',
                    slashes: true,
                    // icon: path.join(__dirname, 'assets/icons/favicon.png')
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

function toggleDevTools() {

    if (win) {
        win.webContents.toggleDevTools();
    }
}

function showWindow() {

    if (!win) {
        createWindow();
    }

    win.show();
}

app.on('ready', appStart);

// callback should be empty if we need to leave main process alive after all window close
app.on('window-all-closed', () => {

});

// initialize the app's main window
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
