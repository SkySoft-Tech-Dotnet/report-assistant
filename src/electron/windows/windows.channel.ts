import { WindowsService, IWindowsService } from 'src/electron/windows/windows.service';
import { ipcSenderToMain, ipcSenderToRenderer } from 'src/electron/common/ipc';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';
import { Channel } from 'src/electron/common/base.channel';

export class WindowsChannel extends Channel {
	constructor(protected service?: WindowsService) {
		super('windows-service');

		this.subscribe();
	}

	closeAll(): Promise<void> {
		return this.callServer('closeAll');
	}

	openNewWindow(openParameters: WindowOpenParameters): Promise<void> {
		return this.callServer('openNewWindow', openParameters);
	}

	protected subscribe() {
		this.listenClient('closeAll', () => this.service.closeAll());
		this.listenClient('openNewWindow', (openParameters: WindowOpenParameters) => this.service.openNewWindow(openParameters));
	}
}
