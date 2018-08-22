import { IpcEventArgs } from '../../common/events-args';
import { WebContents } from 'electron';
import { IpcClient, IpcServer } from './ipc';

export class ChannelToServer {
	protected client: IpcClient;

	constructor(protected channelName: string) {
		this.client = new IpcClient();
	}

	public callServer<T>(command: string, arg?: any): Promise<T> {
		return this.client.send(this.getChannelName(command), arg);
	}

	public listenServer<T>(eventName: string, onEvent: (data: T) => void): void {
		this.client.onReceive(this.getChannelName(eventName))((e: IpcEventArgs<T>) => onEvent(e.data));
	}

	protected getChannelName(eventName: string): string {
		return `${this.channelName}.${eventName}`;
	}
}

export class ChannelToClient {
	protected server: IpcServer;

	constructor(protected channelName: string) {
		this.server = new IpcServer();
	}

	public callClient<T>(command: string, webContent: WebContents, arg?: any): Promise<T> {
		return this.server.send(command, webContent, arg);
	}

	public listenClient<T>(eventName: string, onEvent: (data: T) => void): void {
		this.server.onReceive(this.getChannelName(eventName))((e: IpcEventArgs<T>) => onEvent(e.data));
	}

	protected getChannelName(eventName: string): string {
		return `${this.channelName}.${eventName}`;
	}
}
