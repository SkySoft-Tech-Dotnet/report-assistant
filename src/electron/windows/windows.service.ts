import {WindowOpenParameters} from './windows.model';
import {MainWindow} from './main.window';

import {EnvironmentService} from '../common/environment.service';
import {LoggerService} from '../common/logger.service';
import { BaseWindow, IWindow } from './base.window';

export interface IWindowsService {
    mainWindow: IWindow;
    closeAll(): void;
    openNewWindow(openParameters: WindowOpenParameters): void;
}

export class WindowsService implements IWindowsService {
    public mainWindow: MainWindow;

    private windows: BaseWindow[] = [];

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

		this.mainWindow.hideInsteadClose = true;
    }

    public openNewWindow(openParameters: WindowOpenParameters): void {
        this.windows.push(new BaseWindow(openParameters));
    }

    public closeAll() {
		this.windows.forEach(window => {
			window.close();
		});

        this.mainWindow.close();
    }
}
