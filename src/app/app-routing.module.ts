import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppLayoutComponent} from './layouts/app.layout';

const routes: Routes = [

    // no layout routes
    {
        path: 'add-note',
        loadChildren:
            './pages/add-note/add-note.module#AddNoteModule'
    },

    // App routes goes here here
    {
        path: '',
        component: AppLayoutComponent,
        children:
            [
                {
                    path: 'dashboard',
                    loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
                },
                {
                    path: 'reports',
                    loadChildren: './pages/reports/reports.module#ReportsModule'
                },
                {
                    path: 'todo-list',
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
            ]
    }
];

@NgModule ({
    imports: [RouterModule.forRoot (routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
