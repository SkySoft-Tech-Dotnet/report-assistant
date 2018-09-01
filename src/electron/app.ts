import {WindowsChannel} from './windows/windows.channel';
import {WindowsService} from './windows/windows.service';
import {TrayService} from './tray/tray.service';
import {EnvironmentService} from './common/environment.service';
import {LoggerService} from './common/logger.service';

export class RpApplication {
    private windowsService: WindowsService;
    private trayService: TrayService;
    private environmentService: EnvironmentService;
	private loggerService: LoggerService;
	private windowsChannel: WindowsChannel;

    constructor() {
        this.environmentService = new EnvironmentService();
        this.loggerService = new LoggerService();
        this.windowsService = new WindowsService(this.loggerService, this.environmentService);
		this.trayService = new TrayService(this.windowsService);
		this.windowsChannel = new WindowsChannel(this.windowsService);
    }

	public onBeforeQuit() {
		this.windowsService.mainWindow.hideInsteadClose = false;
	}

    public dispose() {

    }
}
