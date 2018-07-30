import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }  from '@angular/forms';
import { ReportsComponent } from './reports.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        
    ],
    declarations: [
        ReportsComponent
    ],
    providers: [

    ],
    bootstrap: []
})

export class ReportsModule { }