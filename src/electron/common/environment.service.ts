import { ArgsModel } from "./args.model";

export class EnvironmentService {

    public args: ArgsModel

    constructor() {
        const args = process.argv.slice(1);

        this.args = {
            isServe: args.some(val => val === '--serve'),
            devTools: true
        }
    }

}