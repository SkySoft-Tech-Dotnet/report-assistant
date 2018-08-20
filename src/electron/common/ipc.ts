import { ipcMain, ipcRenderer, EventEmitter } from 'electron';
import { generateUuid } from 'src/common/uuid';
import { Emitter, Event, EmitterOptions } from 'src/common/events';

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

  	send<T>(route: string, ...dataArgs: any[]): Promise<T> {
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

			ipcRenderer.send(route, replyChannel, ...dataArgs);

			if (this.timeout) {
				timer = setTimeout(() => {
					didTimeOut = true;
					reject(new Error(`${route} timed out.`));
				}, this.timeout);
			}
    	});
	}

	event<T>(route: string): Event<T> {
		const emitter = new Emitter<T>();

		ipcMain.on(route, (event: any, replyChannel: string, ...dataArgs: any[]) => {

			emitter.setOnError((e: Error) => event.sender.send(replyChannel, EventState.error, e));
			emitter.setOnHandled(() => event.sender.send(replyChannel, EventState.success, results));


			emitter.fire(dataArgs)

			Promise.resolve().then(() => listener(...dataArgs))
			  .then((results) => {
				event.sender.send(replyChannel, 'success', results);
			  })
			  .catch((e) => {
				const message = e && e.message ? e.message : e;
				event.sender.send(replyChannel, 'failure', message);
			  });
		});

		return emitter.event;
	}




  // If I ever implement `off`, then this method will actually use `this`.
  // eslint-disable-next-line class-methods-use-this
  on(route: string, listener) {
    ipcMain.on(route, (event, replyChannel, ...dataArgs) => {
      // Chaining off of Promise.resolve() means that listener can return a promise, or return
      // synchronously -- it can even throw. The end result will still be handled promise-like.
      Promise.resolve().then(() => listener(...dataArgs))
        .then((results) => {
          event.sender.send(replyChannel, 'success', results);
        })
        .catch((e) => {
          const message = e && e.message ? e.message : e;
          event.sender.send(replyChannel, 'failure', message);
        });
    });
  }
}

export const PromiseIpc = PromiseIpcMain;

const mainExport = new PromiseIpcMain();
mainExport.PromiseIpc = PromiseIpcMain;
mainExport.PromiseIpcMain = PromiseIpcMain;

export default mainExport;
module.exports = mainExport;