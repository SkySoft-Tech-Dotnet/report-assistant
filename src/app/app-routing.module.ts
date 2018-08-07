import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'reports',
    loadChildren: './pages/reports/reports.module#ReportsModule'
  },
  {
    path: 'todo_list',
    loadChildren: './pages/todo-list/todo-list.module#TodoListModule'
  },
  {
    path: 'notes',
    loadChildren: './pages/notes/notes.module#NotesModule'
  },
  {
    path: 'meetings',
    loadChildren: './pages/meetings/meetings.module#MeetingsModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
