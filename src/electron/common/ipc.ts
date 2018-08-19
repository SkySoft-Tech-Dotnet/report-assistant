import { ipcMain, ipcRenderer } from 'electron';
import { generateUuid } from 'src/common/uuid';

export enum FlowDirection {
	toRenderer,
	toMain
}

export class Ipc {


	constructor(private flowDirection: FlowDirection, private timeout?: number) {

	}

  	send<T>(route: string, ...dataArgs: any[]): Promise<T> {
    	return new Promise((resolve, reject) => {
    		const replyChannel = `${route}.${generateUuid()}`;
      		let timer: any;
      		let didTimeOut = false;

			ipcMain.once(replyChannel, (event: any, status: boolean, returnData: T) => {
				clearTimeout(timer);
				if (didTimeOut) {
					return null;
				}
				switch (status) {
					case 'success':
						return resolve(returnData);
					case 'failure':
						return reject(new Error(returnData));
					default:
						return reject(new Error(`Unexpected IPC call status "${status}" in ${route}`));
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