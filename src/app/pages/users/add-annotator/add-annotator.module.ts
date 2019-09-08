import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAnnotatorComponent } from './add-annotator.component';
import {
  NzModalModule,
  NzButtonModule,
  NzFormModule,
  NzAutocompleteModule,
  NzCheckboxModule,
  NzInputModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddAnnotatorComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzCheckboxModule,
    NzInputModule,
    NzAutocompleteModule,
  ],
  exports: [
    AddAnnotatorComponent
  ]
})
export class AddAnnotatorModule { }
