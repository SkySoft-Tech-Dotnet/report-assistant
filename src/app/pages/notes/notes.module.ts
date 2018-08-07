import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NotesService } from './notes.service';

@NgModule({
  imports: [
    CommonModule,
    NotesRoutingModule
  ],
  providers: [
    NotesService
  ],
  declarations: [NotesComponent]
})
export class NotesModule { }
