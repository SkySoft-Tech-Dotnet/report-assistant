import { Component, ViewEncapsulation } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
    abbreviation: string;
    project: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {abbreviation: 'VC', project: 'Vacation'},
    {abbreviation: 'INV', project: 'Investigation'},
    {abbreviation: 'OTHER', project: 'Other'}
];

@Component({
    templateUrl: 'projects.component.html',
    selector: 'projects-component',
    styleUrls: ['projects.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ProjectsComponent {
    displayedColumns: string[] = ['select', 'abbreviation', 'project'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    constructor() {
        // Settings.initialize();
        // TheDb.createDb(Settings.dbPath);

        // TheDb.openDb(Settings.dbPath)
        // .then(() => {

        //     const sql = "INSERT INTO Tasks (id, Task) Values (null, 'text 1')";
        //     const values = { };
        //     TheDb.insert(sql, values)
        //     .then((result) => {
        //         if (result.changes !== 1) {
        //             throw new Error(`Expected 1 Hero to be inserted. Was ${result.changes}`);
        //         } else {
                    
        //         }
        //     });

        // })
        // .catch((reason) => {
        //     // Handle errors
        //     console.log('Error occurred while opening database: ', reason);
        // });
    }
}