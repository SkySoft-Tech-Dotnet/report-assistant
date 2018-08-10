import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ShortName: string;

    @Column()
    FullName: string;

    @Column()
    IsActive: boolean;
}
