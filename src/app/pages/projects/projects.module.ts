import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './projects.service';
import { SharedModule } from '../../modules/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ProjectsRoutingModule,
  ],
  providers: [
    ProjectsService
  ],
  declarations: [ProjectsComponent]
})
export class ProjectsModule { }
