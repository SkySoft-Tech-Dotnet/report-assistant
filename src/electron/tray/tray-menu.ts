import {app, Menu} from 'electron';

export function trayMenu (tray, windows) {

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open',
            click: () => {
                windows.main.show();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Add report',
            click: () => {
                windows.main.show();
            }
        },
        {
            label: 'Add note',
            click: () => {
                windows.main.show();
            }
        },
        {
            label: 'Pause notification',
            click: () => {
                windows.main.show();
            }
        },
        {
            type: 'separator'
        },
        {
            label: 'Exit',
            click: function () {
                app.quit();
            }
        }
    ]);

    tray.setContextMenu(contextMenu);
}
