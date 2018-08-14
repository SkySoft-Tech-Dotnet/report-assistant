import {WindowOpenParameters} from './windows.model';
import {MainWindow} from './main.window';

import {EnvironmentService} from '../common/environment.service';
import {LoggerService} from '../common/logger.service';

export interface IWindowsService {
    mainWindow: MainWindow;
    closeAll(): void;
}

export class WindowsService implements IWindowsService {
    public mainWindow: MainWindow;

    constructor(private logService: LoggerService, private environmentService: EnvironmentService) {
        this.createMainWindow();
    }

    private createMainWindow(): void {
        const openParameters: WindowOpenParameters = {
            state: {
                width: 800,
                height: 600,
                show: false
            },
            url: '',
            serve: this.environmentService.args.isServe,
            devTools: this.environmentService.args.devTools
        };

        this.mainWindow = new MainWindow(openParameters);
    }

    public closeAll() {
        this.mainWindow.close();
    }
}
