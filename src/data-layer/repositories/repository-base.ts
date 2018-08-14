import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Settings } from './settings';
import { Report } from '../entities/report.entity';
import { Project } from '../entities/project.entity';


export class RepositoryBase<TEntity> {

    private connection: Promise<Connection>;
    private options: ConnectionOptions;

    constructor() {
        console.log('test');
        Settings.initialize();
        this.options = {
            type: 'sqlite',
            database: Settings.dbPath,
            entities: [Project, Report],
            synchronize: true,
            logging: false,
        };
        this.connection = createConnection(this.options);

        this.connection.then(conn => {
            console.log(conn);
        });

    }

    public add(entity: TEntity, type: string) {
        this.connection
            .then(connection => {

                const repository = connection.getRepository(type);
                console.log(repository);
                return repository.save(entity);

            })
            .then(data => {
                console.log(data);
            })
            .catch(error => console.log(error));
    }

    // public delete(id: number){
    //     // this.add( new DeepPartial<User>() );

    //     this.connection.then(async (connection ) => {
    //         let repository = connection.getRepository(this.currentType);

    //         let item = await repository.findOne(id);
    //         if (item == undefined)
    //             throw new Error('Cannot find record to remove')
    //         await repository.remove(item);

    //     }).catch(error => console.log(error));
    // }
    // public update(id: number){
    //     this.connection.then(async (connection ) => {
    //         let repository = connection.getRepository(this.currentType);
    //         let item = await repository.findOne(id);
    //         if (item == undefined)
    //         throw new Error('Cannot find record to remove')

    //         // await repository.save(item);
    //         // await connection.manager.save(entity);

    //     }).catch(error => console.log(error));
    // }
}
