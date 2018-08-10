import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCheckboxModule, MatTableModule, MatCardModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Angular Material
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Angular Material
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatIconModule
  ],
  declarations: []
})
export class SharedModule { }
