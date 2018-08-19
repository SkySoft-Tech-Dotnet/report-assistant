import {app} from 'electron';
import {RpApplication} from './src/electron/app';


let rpApplication: RpApplication = null;

app.on ('ready', () => {
    rpApplication = new RpApplication();
});

app.on('before-quit', () => {
	rpApplication.onBeforeQuit();
});

// callback should be empty if we need to leave main process alive after all window close
app.on ('window-all-closed', () => {
    rpApplication.dispose();
});
