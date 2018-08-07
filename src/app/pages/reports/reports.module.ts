import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { ReportsService } from './reports.service';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule
  ],
  providers: [
    ReportsService
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
