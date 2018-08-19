import * as url from 'url';
import * as path from 'path';
import {BrowserWindow} from 'electron';

import {WindowState, WindowOpenParameters} from './windows.model';

export interface IWindow {
	showOrFocus(): void;
	close(): void;
}

export class BaseWindow implements IWindow {

    public hideInsteadClose: boolean;

    public windowInstance: BrowserWindow;

    constructor(openParameters: WindowOpenParameters) {

        this.createBrowserWindow(openParameters.state);

        let urlWithPath: string;

        if (openParameters.serve) {
            require ('electron-reload')(__dirname, {
                electron: require (path.join(__dirname, '../../../../node_modules/electron'))
            });

            urlWithPath = 'http://localhost:4200';
            // urlWithPath = 'http://localhost:4200' + '/#/' + openParameters.url;
        } else {
            urlWithPath = url.format({
                pathname: path.join(__dirname, `../../../../dist/index.html`),
                // pathname: path.join(__dirname, `../../../../dist/index.html`) + '/#/' + openParameters.url,
                protocol: 'file:',
                slashes: true,
                // icon: path.join(__dirname, 'assets/icons/favicon.png')
            });
        }

        this.windowInstance.loadURL(urlWithPath);

        if (openParameters.devTools) {
            this.windowInstance.webContents.openDevTools();
        }
    }

    private createBrowserWindow(windowState: WindowState): void {
        this.windowInstance = new BrowserWindow({width: windowState.width, height: windowState.height, show: windowState.show});

        this.windowInstance.on('close', (e) => {
            if (this.hideInsteadClose) {
                e.preventDefault();
                this.windowInstance.hide();
            }
		});
    }

    public showOrFocus () {
        if (!this.windowInstance) {
            return;
        }

        if (this.windowInstance.isMinimized()) {
            this.windowInstance.restore();
        }

        // if (!this.windowInstance.isVisible){
        this.windowInstance.show();
        // }

        this.windowInstance.focus();
    }

    public close() {
        this.hideInsteadClose = false;
        this.windowInstance.close();
    }
}
