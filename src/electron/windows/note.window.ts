import * as url from 'url';
import * as path from 'path';
import {BrowserWindow} from 'electron';

import {WindowState, WindowOpenParameters} from './windows.model';

export class NoteWindow {

    private isForseClose: boolean;

    public windowInstance: BrowserWindow;

    constructor (openParameters: WindowOpenParameters) {

        this.createBrowserWindow (openParameters.state);

        let urlWithPath: string;

        if (openParameters.serve) {
            require ('electron-reload') (__dirname, {
                electron: require (path.join (__dirname, '../../../../node_modules/electron'))
            });

            urlWithPath = path.join ('http://localhost:4200/#/add-note');
        } else {
            urlWithPath = url.format ({
                pathname: path.join (__dirname, '/dist/index.html/#/add-note'),
                protocol: 'file:',
                slashes: true,
            });
        }

        this.windowInstance.loadURL (urlWithPath);

        if (openParameters.devTools) {
            this.windowInstance.webContents.openDevTools ();
        }
    }

    private createBrowserWindow (windowState: WindowState): void {
        this.windowInstance = new BrowserWindow ({
            width: windowState.width,
            height: windowState.height,
            show: windowState.show,
            frame: false,
            alwaysOnTop: true
        });

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
