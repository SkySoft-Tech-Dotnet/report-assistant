import { Injectable } from '@angular/core';
import { IWindowsService } from 'src/electron/windows/windows.service';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';
import { IWindow } from 'src/electron/windows/base.window';
import { ipcClient } from '../../electron/ipc/ipc';
import { IChannel } from '../../electron/ipc/base.channel';
import { Channels } from '../../electron/ipc/channels.enum';

@Injectable()
export class WindowsServiceClient implements IWindowsService {
	private channel: IChannel;

	mainWindow: IWindow;

	constructor() {
		this.channel = ipcClient.getChannel(Channels.windowsService);
	}

	closeAll(): void {
		this.channel.call('closeAll');
	}

	openNewWindow(openParameters: WindowOpenParameters): void {
		this.channel.call('openNewWindow', openParameters);
	}
}
