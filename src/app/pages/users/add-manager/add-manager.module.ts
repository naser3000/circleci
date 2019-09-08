import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddManagerComponent } from './add-manager.component';
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
    AddManagerComponent
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
    AddManagerComponent
  ]
})
export class AddManagerModule { }
