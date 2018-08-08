import {Tray} from 'electron';
import {trayMenu} from './tray-menu';
import {environment} from '../../environments/environment';

export function initTray(windows): Tray {

    const tray = new Tray(environment.trayIconPath);

    tray.setToolTip('Report Organizer');
    trayMenu(tray, windows);

    tray.on('double-click', () => {
        windows.main.show();
    });

    return tray;
}
