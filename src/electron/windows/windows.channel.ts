import { WindowsService } from './windows.service';
import { WindowOpenParameters } from './windows.model';
import { ChannelToClient } from '../common/base.channel';

export class WindowsChannel extends ChannelToClient {
	constructor(protected service?: WindowsService) {
		super('windows-service');

		this.subscribe();
	}

	protected subscribe() {
		this.listenClient('closeAll', () => this.service.closeAll());
		this.listenClient('openNewWindow', (openParameters: WindowOpenParameters) => this.service.openNewWindow(openParameters));
	}
}
