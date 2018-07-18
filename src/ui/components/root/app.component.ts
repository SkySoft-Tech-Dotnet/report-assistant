import { Component, ViewEncapsulation } from '@angular/core';

import { RepositoryBase } from '../../../data-layer/repositories/repository-base';
import { Project } from '../../../data-layer/entities/project.entity';
import { Report } from '../../../data-layer/entities/report.entity';


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

        let report = new Report();          
            report.Duration = 1;
            report.Description = "description";
            report.Project = project;
            report.Created = new Date();

        this.add(report, 'Report');
    }
}