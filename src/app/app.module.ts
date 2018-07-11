import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { routing }  from './app-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxElectronModule } from 'ngx-electron';
import { NavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportsComponent } from './reports/reports.component';
import { ProjectsComponent } from './projects/projects.component';
import { GlobalErrorHandler } from './GlobalErrorHandler';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatSidenavModule,
        MatButtonModule,
        routing,
        NgxElectronModule,
        MatTableModule,
        MatCheckboxModule,
        MatCardModule,
        MatIconModule,
    ],

    declarations: [
        AppComponent,
        NavigationComponent,
        DashboardComponent,
        ReportsComponent,
        ProjectsComponent,
    ],

    providers: [
        {
            provide: ErrorHandler, 
            useClass: GlobalErrorHandler
        }
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
