import { Component } from '@angular/core';
import { RepositoryBase } from '../data-layer/repositories/repository-base';
import { Report } from '../data-layer/entities/report.entity';

@Component({
  selector: 'rp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends RepositoryBase<Report> {

  constructor() {
    super();
    const report = new Report();
    report.Duration = 1;
    report.Description = 'description';
    // report.Project = project;
    report.Created = new Date();

    this.add(report, 'Report');
  }

}
