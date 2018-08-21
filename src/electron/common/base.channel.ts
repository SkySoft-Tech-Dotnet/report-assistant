import { IpcEventArgs } from 'src/common/events-args';
import { Event } from 'src/common/events';
import { ipcMain, ipcRenderer } from 'electron';
import { ipcSenderToMain, ipcSenderToRenderer} from 'src/electron/common/ipc';

// export class Protocol {
// 	private currentTask: Promise<T>

// 	public call(): Promise<T> {
// 		ipcRenderer.send('');

// 		ipcMain.once
// 	}

// }


export class Channel {
	constructor(protected channelName: string) {

	}

	public callServer<T>(command: string, arg?: any): Promise<T> {
		return ipcSenderToMain.send(this.getChannelName(command), arg);
	}

	public listenClient<T>(eventName: string, onEvent: (data: T) => void): void {
		ipcSenderToRenderer.onReceive(this.getChannelName(eventName))((e: IpcEventArgs<T>) => onEvent(e.data));
	}

	protected getChannelName(eventName: string): string {
		return `${this.channelName}.${eventName}`;
	}
}
