import { WindowOpenParameters } from './windows.model';
import { BaseWindow } from 'src/electron/windows/base.window';

export class MainWindow extends BaseWindow {
    constructor(openParameters: WindowOpenParameters) {
		super(openParameters);
	}
}
