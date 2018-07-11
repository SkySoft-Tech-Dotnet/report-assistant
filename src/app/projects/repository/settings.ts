import * as path from 'path';
import { remote } from 'electron';

export class Settings {

    public static dbFolder: string;
    public static dbPath: string;
    public static appPath: string;
    private static dataSubFolder = 'dist/assets/data';
    private static dbName = 'database.db';

    public static initialize(): void {
        Settings.getPaths();
    }

    private static getPaths() {
        Settings.appPath = remote.app.getAppPath();
        Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName)  
    }
}