import {app} from 'electron';
import {App} from './src/electron/app';

// detect serve mode
const args = process.argv.slice(1);
const isServe: boolean = args.some(val => val === '--serve');

app.on('ready', () => {
    App.init(isServe, true);
});

// callback should be empty if we need to leave main process alive after all window close
app.on('window-all-closed', () => {

});
