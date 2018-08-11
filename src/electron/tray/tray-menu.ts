import {app, Menu, Tray} from 'electron';

import {WindowsService} from '../windows/windows.service';

export function buildTrayMenu (tray: Tray, windowsService: WindowsService) {

    const contextMenu = Menu.buildFromTemplate ([
        {
            label: 'Open',
            click: () => {
                windowsService.mainWindow.showOrFocus ();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Add report',
            click: () => {
                windowsService.mainWindow.showOrFocus ();
            }
        },
        {
            label: 'Add note',
            click: () => {
                windowsService.mainWindow.showOrFocus ();
            }
        },
        {
            label: 'Pause notification',
            click: () => {
                windowsService.mainWindow.showOrFocus ();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit',
            click: function () {
                windowsService.closeAll ();
                app.quit ();
            }
        }
    ]);

    tray.setContextMenu (contextMenu);
}
