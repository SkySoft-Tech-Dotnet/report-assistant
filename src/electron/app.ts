import {WindowsServiceServer} from './windows/windows-server.service';
import {WindowsService} from './windows/windows.service';
import {TrayService} from './tray/tray.service';
import {EnvironmentService} from './common/environment.service';
import {LoggerService} from './common/logger.service';

export class RpApplication {
    private windowsService: WindowsService;
    private trayService: TrayService;
    private environmentService: EnvironmentService;
	private loggerService: LoggerService;
	private windowsServiceServer: WindowsServiceServer;

    constructor() {
        this.environmentService = new EnvironmentService();
        this.loggerService = new LoggerService();
        this.windowsService = new WindowsService(this.loggerService, this.environmentService);
		this.trayService = new TrayService(this.windowsService);
		this.windowsServiceServer = new WindowsServiceServer(this.windowsService);
    }

	public onBeforeQuit() {
		this.windowsService.mainWindow.hideInsteadClose = false;
	}

    public dispose() {

    }
}
