import { Component } from '@angular/core';
import { RepositoryBase } from './DAL/repositories/repository-base';
import { Report } from './DAL/entities/report.entity';
import { Project } from './DAL/entities/project.entity';

@Component({
  selector: 'rp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RepositoryBase<Report> {

  constructor() {
    super();
    // let project = new Project();
    // project.id = 1;
    // project.FullName = "full_name";
    // project.ShortName = "short_name";
    // project.IsActive = true;

    let report = new Report();
    report.Duration = 1;
    report.Description = "description";
    // report.Project = project;
    report.Created = new Date();

    this.add(report, 'Report');
  }

}
