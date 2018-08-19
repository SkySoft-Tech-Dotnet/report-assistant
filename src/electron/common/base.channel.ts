import { Event } from 'src/common/events';
import { ipcMain, ipcRenderer } from 'electron';

export class Protocol {
	private currentTask: Promise<T>

	public call(): Promise<T> {
		ipcRenderer.send('');

		ipcMain.once
	}

}


export class Channel {
	constructor(protected channelName: string) {

	}

	public call<T>(command: string, arg?: any): Promise<T> {
		return new Promise();
	}

	public listen<T>(event: string, arg?: any): Event<T> {
		return null;
	}
}
