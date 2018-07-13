import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Project } from './project.model';

@Entity()
export class Report {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    Description : string;

    @Column()
    Duration  : number;

    @ManyToOne(() => Project, project => project.Reports)
    Project : Project;
}