'use strict';

const {app, BrowserWindow } = require('electron');
const path = require('path');

const devMode = /electron/.test(path.basename(app.getPath('exe'), '.exe'));

if (devMode) {
	// Set appname and userData to indicate development environment
	app.setName(app.getName() + '-dev');
	app.setPath('userData', app.getPath('userData') + '-dev');

	// Setup reload
	require('electron-reload')(path.join(__dirname, '/dist/app.js'), {
		electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
	});
}

let mainWindow;

let createWindow = () => {
	// Create the browser window.
    mainWindow = new BrowserWindow({
        width: 900,
        height: 750,
        frame: true,
      });


	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/dist/index.html');

	// Open the DevTools.
	if (devMode && process.argv.indexOf('--noDevTools') === -1) {
		mainWindow.webContents.openDevTools();
	}

	// Emitted when the window is closed.
	mainWindow.on('closed', () => {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) createWindow();
});
