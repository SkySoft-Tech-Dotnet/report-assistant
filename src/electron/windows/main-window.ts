import * as url from 'url';
import * as path from 'path';
import {BrowserWindow} from 'electron';

export function initMainWindow (isServe: boolean, isDevtoolsOpen: boolean) {

    // set show - true if you need to open window after app start.
    const window = new BrowserWindow ({width: 800, height: 600, show: false});

    if (isServe) {

        // get dynamic version from localhost:4200
        // require ('electron-reload') (__dirname, {
        //     electron: require (`${__dirname}/node_modules/electron`)
        // });
        require ('electron-reload') (__dirname, {
            electron: require (path.join (__dirname, '../../../../node_modules/electron'))
        });
        window.loadURL ('http://localhost:4200');
    } else {

        // load the dist folder from Angular
        window.loadURL (
            url.format ({
                pathname: path.join (__dirname, `/dist/index.html`),
                protocol: 'file:',
                slashes: true,
                // icon: path.join(__dirname, 'assets/icons/favicon.png')
            })
        );
    }

    if (isDevtoolsOpen) {
        window.webContents.openDevTools ();
    }

    return window;
}
