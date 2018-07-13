import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ProjectsComponent } from './component/projects/projects.component';

const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'reports',
      component: ReportsComponent
    },
    {
      path: 'projects',
      component: ProjectsComponent
    }
];
export const routing = RouterModule.forRoot(routes);