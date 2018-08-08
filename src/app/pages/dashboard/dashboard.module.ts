import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [
    DashboardService
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
