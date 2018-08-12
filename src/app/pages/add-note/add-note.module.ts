import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import { AddNoteRoutingModule } from './add-note-routing.module';
import {AddNoteComponent} from './add-note.component';
import { AddNoteService } from './add-note.service';



@NgModule ({
    imports: [
        CommonModule,
        AddNoteRoutingModule,
        MatButtonModule
    ],
    providers: [
        AddNoteService
    ],
    declarations: [AddNoteComponent]
})
export class AddNoteModule {}
