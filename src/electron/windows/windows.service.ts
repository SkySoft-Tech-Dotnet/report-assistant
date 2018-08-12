import {WindowOpenParameters} from './windows.model';
import {MainWindow} from './main.window';
import {NoteWindow} from './note.window';


import {EnvironmentService} from '../common/environment.service';
import {LoggerService} from '../common/logger.service';


export interface IWindowsService {
    mainWindow: MainWindow;
    noteWindow: NoteWindow;

    closeAll (): void;
}

export class WindowsService implements IWindowsService {
    public mainWindow: MainWindow;
    public noteWindow: NoteWindow;

    constructor (private logService: LoggerService, private environmentService: EnvironmentService) {
        this.createMainWindow ();
        this.createNoteWindow ();
    }

    private createMainWindow (): void {
        const openParameters: WindowOpenParameters = {
            state: {
                width: 800,
                height: 600,
                show: false
            },
            url: '',
            serve: this.environmentService.args.isServe,
            devTools: this.environmentService.args.devTools
        };

        this.mainWindow = new MainWindow (openParameters);
    }

    private createNoteWindow (): void {
        const openParameters: WindowOpenParameters = {
            state: {
                width: 400,
                height: 200,
                show: false
            },
            serve: this.environmentService.args.isServe,
            devTools: this.environmentService.args.devTools
        };

        this.noteWindow = new NoteWindow (openParameters);
    }

    public closeAll () {
        this.mainWindow.close ();
        this.noteWindow.close ();
    }
}
