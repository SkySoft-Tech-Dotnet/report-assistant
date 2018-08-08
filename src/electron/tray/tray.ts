import {Tray} from 'electron';
import {trayMenu} from './tray-menu';
import {environment} from '../../environments/environment';
import {initMainWindow} from '../windows/main-window';

export function initTray(windows, isServe, isDevtoolsOpen): Tray {

    const tray = new Tray(environment.trayIconPath);

    tray.setToolTip('Report Organizer');
    trayMenu(tray, windows);

    tray.on('double-click', () => {
        if (!windows.main) {
            windows.main = initMainWindow(isServe, isDevtoolsOpen);
        }

        windows.main.show();
    });

    return tray;
}
