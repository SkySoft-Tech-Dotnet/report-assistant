import {Tray} from 'electron';
import {buildTrayMenu} from './tray-menu';
import {environment} from '../../environments/environment';

import {WindowsService} from '../windows/windows.service';

export class TrayService {
    public tray: Tray;

    constructor(windowService: WindowsService) {
        this.tray = new Tray(environment.trayIconPath);
        this.tray.setToolTip('Report Assistant');

        buildTrayMenu(this.tray, windowService);

        this.tray.on('double-click', () => {
            windowService.mainWindow.showOrFocus();
        });
    }
}
