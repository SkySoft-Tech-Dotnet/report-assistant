import { Component, ViewEncapsulation } from '@angular/core';

import { RepositoryBase } from './repository/repository-base';
import { Project } from './model/project.model';
import { Report } from './model/report.model';


@Component({
  selector: 'app-root',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RepositoryBase<Report> {

    constructor() {
        super();
        let project = new Project();
        project.id = 1;
        project.FullName = "full_name";
        project.ShortName = "short_name";
        project.IsActive = true;

        let report1 = new Report();          
            report1.Duration = 1;
            report1.Description = "description";
            report1.Project = project;

        // let report2 = new Report();
        //     report2.Duration = 2;
        //     report2.Project = project;

        // project.Reports = [report1, report2];

        this.add(report1, 'Report');
    }
}