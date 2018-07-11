import * as fs from 'fs';
import * as path from 'path';
import { Database } from 'sqlite3';
import { Settings } from './settings';

export interface IDbResult {
    changes: number;
    lastID: number;
}

export class TheDb {
    private static db: Database;

    public static selectOne(sql: string, values: {}): Promise<{}> {
        return new Promise<{}>((resolve, reject) => {
            TheDb.db.get(sql, values, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    public static selectAll(sql: string, values: {}): Promise<Array<{}>> {
        return new Promise<Array<{}>>((resolve, reject) => {
            TheDb.db.all(sql, values, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public static insert(sql: string, values: {}): Promise<IDbResult> {
        return TheDb.change(sql, values);
    }

    public static update(sql: string, values: {}): Promise<IDbResult> {
        return TheDb.change(sql, values);
    }

    public static delete(sql: string, values: {}): Promise<IDbResult> {
        return TheDb.change(sql, values);
    }

    public static query(sql: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            TheDb.db.run(sql, {}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public static createDb(dbPath: string) {
        dbPath += path.extname(dbPath) === '.db' ? '' : '.db';
        const schemaPath = path.join(Settings.dbFolder, `database.db.sql`);
        const schema = fs.readFileSync(schemaPath, { encoding: 'utf8' });
      
        return TheDb.getDb(dbPath)
            .then(() => TheDb.exec(schema))
            .then(() => {
                console.log('Database created.');
                return dbPath;
        });
    }

    public static openDb(dbPath: string): Promise<void> {
        console.log('Opening database: ', dbPath);
        return TheDb.getDb(dbPath)
            .then(() => {
                console.log('Database opened');
                return Promise.resolve();
            });
    }

    public static closeDb(): Promise<void> {
        if (!TheDb.db) {
            return Promise.resolve();
        }
        return new Promise<void>((resolve, reject) => {
            TheDb.db.close((err) => {
                console.log('Closing current Db');
                if (err) {
                    reject(err);
                    console.log('Db not closed');
                } else {
                    resolve();
                }
            });
        });
    }

    private static getDb(dbPath: string): Promise<void> {
        return TheDb.closeDb()
            .then(() => {
                return new Promise<void>((resolve, reject) => {
                    const db = new Database(dbPath, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            TheDb.db = db;
                            resolve();
                        }
                    });
            });
        });
    }

    private static change(sql: string, values: {}): Promise<IDbResult> {
        return new Promise<IDbResult>((resolve, reject) => {
            TheDb.db.run(sql, values, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ changes: this.changes, lastID: this.lastID });
                }
            });
        });
    }

    private static exec(sql: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            TheDb.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}