import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from "typeorm";
import { Report } from './report.entity';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ShortName : string;

    @Column()
    FullName : string;

    @Column()
    IsActive : boolean;

    @OneToMany(() => Report, report => report.Project)
    Reports : Report[];
}