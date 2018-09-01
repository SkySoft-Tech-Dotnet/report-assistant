import { Channels } from './../ipc/channels.enum';
import { WindowsService } from './windows.service';
import { WindowOpenParameters } from './windows.model';
import { IChannel } from '../ipc/base.channel';
import { ipcServer } from '../ipc/ipc';

export class WindowsChannel {
	private channel: IChannel;

	constructor(protected service?: WindowsService) {
		this.channel = ipcServer.getChannel(Channels.windowsService);

		this.subscribe();
	}

	protected subscribe() {
		this.channel.listen('closeAll')(e => this.service.closeAll());
		this.channel.listen<WindowOpenParameters>('openNewWindow')(e => this.service.openNewWindow(e.data));
	}
}
