import { ipcMain, ipcRenderer, EventEmitter } from 'electron';
import { generateUuid } from 'src/common/uuid';
import { Emitter, Event, EmitterOptions } from 'src/common/events';
import { IpcEventArgs, EventArgs } from 'src/common/events-args';

export enum FlowDirection {
	toRenderer,
	toMain
}

enum EventState {
	error,
	success
}

export class Ipc {

	protected get eventSource(): EventEmitter {
		return this.flowDirection === FlowDirection.toMain ? ipcRenderer : ipcMain;
	}

	protected get eventTarget(): EventEmitter {
		return this.flowDirection === FlowDirection.toMain ? ipcMain : ipcRenderer;
	}

	constructor(private flowDirection: FlowDirection, private timeout?: number) {

	}

  	send<T>(route: string, args: any): Promise<T> {
    	return new Promise((resolve, reject) => {
    		const replyChannel = `${route}.${generateUuid()}`;
      		let timer: any;
      		let didTimeOut = false;

			ipcMain.once(replyChannel, (event: any, status: EventState, returnData: T | Error) => {
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

			ipcRenderer.send(route, replyChannel, args);

			if (this.timeout) {
				timer = setTimeout(() => {
					didTimeOut = true;
					reject(new Error(`${route} timed out.`));
				}, this.timeout);
			}
    	});
	}

	onReceive<T>(route: string): Event<IpcEventArgs<T>> {
		const emitter = new Emitter<IpcEventArgs<T>>();

		ipcMain.on(route, (event: any, replyChannel: string, args: T) => {

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

export const ipcSenderToMain: Ipc = new Ipc(FlowDirection.toMain, 0);
export const ipcSenderToRenderer: Ipc = new Ipc(FlowDirection.toRenderer, 0);
