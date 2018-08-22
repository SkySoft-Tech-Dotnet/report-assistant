import { IpcEventArgs } from '../../common/events-args';
import { Event } from '../../common/events';
import { BrowserWindow } from 'electron';

export interface IChannel {
	call<T>(command: string, arg?: any, windowTarget?: BrowserWindow): Promise<T>;
	listen<T>(event: string): Event<IpcEventArgs<T>>;
}
