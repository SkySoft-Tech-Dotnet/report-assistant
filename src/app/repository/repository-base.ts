import { Connection, ConnectionOptions, createConnection} from "../../../node_modules/typeorm";
import { Settings } from './settings';
import { Report } from '../model/report.model';
import { Project } from '../model/project.model';


export class RepositoryBase<TEntity>{

    //private currentType: Function = function(){};
    private connection: Promise<Connection>;
    private options: ConnectionOptions;

    constructor() {
        Settings.initialize();
        this.options = {
            type: "sqlite",
            database: Settings.dbPath, 
            entities: [Project, Report],
            synchronize: true,
            logging: false,
        };
        this.connection  = createConnection(this.options);
    }

    public add(entity: TEntity, type: string) {
        this.connection.then(async connection => {

            let repository = connection.getRepository(type);
            await repository.save(entity);

        }).catch(error => console.log(error));
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