import { Injectable } from '@angular/core';
import { IWindowsService } from 'src/electron/windows/windows.service';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';
import { IWindow } from 'src/electron/windows/base.window';
import { ChannelToServer } from 'src/electron/common/base.channel';

@Injectable()
export class WindowsService extends ChannelToServer implements IWindowsService {
	mainWindow: IWindow;

	constructor() {
		super('windows-service');
	}

	closeAll(): void {
		this.callServer('closeAll');
	}

	openNewWindow(openParameters: WindowOpenParameters): void {
		this.callServer('openNewWindow', openParameters);
	}
}
