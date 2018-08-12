import * as url from 'url';
import * as path from 'path';
import {BrowserWindow} from 'electron';

import {WindowState, WindowOpenParameters} from './windows.model';

export class MainWindow {

    private isForseClose: boolean;

    public windowInstance: BrowserWindow;


    constructor (openParameters: WindowOpenParameters) {

        this.createBrowserWindow (openParameters.state);

        let urlWithPath: string;

        if (openParameters.serve) {
            // require ('electron-reload') (__dirname, {
            //     electron: require (path.join (__dirname, '../../../../node_modules/electron'))
            // });
            require ('electron-reload') (__dirname, {
                electron: require ('electron-prebuilt')
            });

            urlWithPath = 'http://localhost:4200';
        } else {
            urlWithPath = url.format ({
                pathname: path.join (__dirname, `/dist/index.html`, openParameters.url),
                protocol: 'file:',
                slashes: true,
                // icon: path.join(__dirname, 'assets/icons/favicon.png')
            });
        }

        this.windowInstance.loadURL (urlWithPath);

        if (openParameters.devTools) {
            this.windowInstance.webContents.openDevTools ();
        }
    }

    private createBrowserWindow (windowState: WindowState): void {
        this.windowInstance = new BrowserWindow ({width: windowState.width, height: windowState.height, show: windowState.show});

        this.windowInstance.on ('close', (e) => {
            if (!this.isForseClose) {
                e.preventDefault ();
                this.windowInstance.hide ();
            }
        });
    }

    public showOrFocus () {
        if (!this.windowInstance) {
            return;
        }

        if (this.windowInstance.isMinimized ()) {
            this.windowInstance.restore ();
        }

        // if (!this.windowInstance.isVisible){
        this.windowInstance.show ();
        // }

        this.windowInstance.focus ();
    }

    public close () {
        this.isForseClose = true;
        this.windowInstance.close ();
    }
}


// export function initMainWindow (isServe: boolean, isDevtoolsOpen: boolean) {

//     // set show - true if you need to open window after app start.
//     const window = new BrowserWindow ({width: 800, height: 600, show: false});

//     if (isServe) {

//         // get dynamic version from localhost:4200
//         // require ('electron-reload') (__dirname, {
//         //     electron: require (`${__dirname}/node_modules/electron`)
//         // });
//         require ('electron-reload') (__dirname, {
//             electron: require (path.join (__dirname, '../../../../node_modules/electron'))
//         });
//         window.loadURL ('http://localhost:4200');
//     } else {

//         // load the dist folder from Angular
//         window.loadURL (
//             url.format ({
//                 pathname: path.join (__dirname, `/dist/index.html`),
//                 protocol: 'file:',
//                 slashes: true,
//                 // icon: path.join(__dirname, 'assets/icons/favicon.png')
//             })
//         );
//     }

//     if (isDevtoolsOpen) {
//         window.webContents.openDevTools ();
//     }

//     return window;
// }
