import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsComponent } from './meetings.component';
import { MeetingsService } from './meetings.service';

@NgModule({
  imports: [
    CommonModule,
    MeetingsRoutingModule
  ],
  providers: [
    MeetingsService
  ],
  declarations: [MeetingsComponent]
})
export class MeetingsModule { }
