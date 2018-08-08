import {Windows} from './windows/windows';
import {Tray} from 'electron';
import {initMainWindow} from './windows/main-window';
import {initTray} from './tray/tray';

export class App {
    static windows: Windows = new Windows();
    static tray: Tray = null;

    static init (isServe: boolean, isDevtoolsOpen: boolean): void {
        App.windows.main = initMainWindow(isServe, isDevtoolsOpen);
        App.windows.main.on('closed', () => {
            App.windows.main = null;
        });

        App.tray = initTray(App.windows, isServe, isDevtoolsOpen);
    }
}
