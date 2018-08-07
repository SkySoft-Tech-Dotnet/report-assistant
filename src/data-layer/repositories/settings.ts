import * as path from 'path';
import { remote } from 'electron';

export class Settings {

    // TODO: different configs for dev and prod

    public static dbFolder: string;
    public static dbPath: string;
    public static appPath: string;
    private static dataSubFolder = 'dist/assets/data'; // dev
    // private static dataSubFolder = '/'; //prod
    private static dbName = 'database.db';

    public static initialize(): void {
        Settings.getPaths();
    }

    private static getPaths() {
        // dev
        // return folder where app is running
        // Settings.appPath = remote.app.getAppPath();

        // prod
        // return user data folder
        Settings.appPath = remote.app.getPath('userData');

        Settings.dbFolder = path.join(Settings.appPath, Settings.dataSubFolder);
        Settings.dbPath = path.join(Settings.dbFolder, this.dbName);
    }
}
