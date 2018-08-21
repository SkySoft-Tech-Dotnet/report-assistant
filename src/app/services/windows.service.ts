import { Injectable } from '@angular/core';
import { IWindowsService } from 'src/electron/windows/windows.service';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';
import { IWindow } from 'src/electron/windows/base.window';
import { WindowsChannel } from 'src/electron/windows/windows.channel';

@Injectable()
export class WindowsService implements IWindowsService {
	private channel: WindowsChannel;

	mainWindow: IWindow;

	constructor() {
		this.channel = new WindowsChannel();
	}

	closeAll(): void {
		this.channel.closeAll();
	}

	openNewWindow(openParameters: WindowOpenParameters): void {
		this.channel.openNewWindow(openParameters);
	}
}
