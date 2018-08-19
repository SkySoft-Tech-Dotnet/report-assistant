import { Injectable } from '@angular/core';
import { IWindowsService } from 'src/electron/windows/windows.service';
import { WindowOpenParameters } from 'src/electron/windows/windows.model';
import { IWindow } from 'src/electron/windows/base.window';

@Injectable()
export class WindowsService implements IWindowsService {
	private channel: WindowC

	mainWindow: IWindow;

	constructor() {

	}

	closeAll(): void {
		throw new Error('Method not implemented.');
	}

	openNewWindow(openParameters: WindowOpenParameters): void {
		throw new Error('Method not implemented.');
	}
}
