import { ipcRenderer, WebContents, IpcRenderer, IpcMain, ipcMain } from 'electron';
import { generateUuid } from '../../common/uuid';
import { Emitter, Event, EmitterOptions } from '../../common/events';
import { IpcEventArgs } from '../../common/events-args';

export enum FlowDirection {
	toRenderer,
	toMain
}

enum EventState {
	error,
	success
}

export abstract class Ipc {
	constructor(private timeout?: number) {

	}

  	protected sendInternal<T>(route: string, args: any, receiver: IpcRenderer | IpcMain, sender: IpcRenderer | WebContents): Promise<T> {
    	return new Promise((resolve, reject) => {
    		const replyChannel = route + '.' + generateUuid();
      		let timer: any;
      		let didTimeOut = false;

			receiver.once(replyChannel, (event: any, status: EventState, returnData: T | Error) => {
				clearTimeout(timer);
				if (didTimeOut) {
					return null;
				}

				switch (status) {
					case EventState.success:
						return resolve(returnData as T);
					case EventState.error:
						// Error has been thrown by the target of an invocation
						return reject(returnData as Error);
					default:
						return reject(new Error('Unknown status of ipc event. Ipc.send cannot be used directly with ipcMain.on or ipcRenderer.on'));
				}
			});

			sender.send(route, replyChannel, args);

			if (this.timeout) {
				timer = setTimeout(() => {
					didTimeOut = true;
					reject(new Error(`${route} timed out.`));
				}, this.timeout);
			}
    	});
	}

	protected onReceiveInternal<T>(route: string, receiver: IpcRenderer | IpcMain): Event<IpcEventArgs<T>> {
		const emitter = new Emitter<IpcEventArgs<T>>();

		receiver.on(route, (event: any, replyChannel: string, args: T) => {

			const eventArgs = new IpcEventArgs<T>(args);

			emitter.updateOptions((options: EmitterOptions<IpcEventArgs<T>>) => {
				options.onErrorInHandler = (e: Error) => event.sender.send(replyChannel, EventState.error, e);
				options.onHandled = (processedArgs: IpcEventArgs<T>) => event.sender.send(replyChannel, EventState.success, processedArgs.response);
			});

			emitter.fire(eventArgs);
		});

		return emitter.event;
	}
}

export class IpcClient extends Ipc {
	constructor(timeout?: number) {
		super(timeout);
	}

  	public send<T>(route: string, args: any): Promise<T> {
		return this.sendInternal(route, args, ipcRenderer, ipcRenderer);
	}

	public onReceive<T>(route: string): Event<IpcEventArgs<T>> {
		return this.onReceiveInternal(route, ipcRenderer);
	}
}

export class IpcServer extends Ipc {
	constructor(timeout?: number) {
		super(timeout);
	}

  	public send<T>(route: string, webContent: WebContents, args: any): Promise<T> {
		return this.sendInternal(route, args, ipcMain, webContent);
	}

	public onReceive<T>(route: string): Event<IpcEventArgs<T>> {
		return this.onReceiveInternal(route, ipcMain);
	}
}
