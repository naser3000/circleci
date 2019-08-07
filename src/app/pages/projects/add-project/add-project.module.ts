import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProjectComponent } from './add-project.component';
import { NzIconModule, NzModalModule, NzButtonModule, NzFormModule, NzInputModule, NzAutocompleteModule, NzDatePickerModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzIconModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzDatePickerModule
  ],
  exports: [
    AddProjectComponent
  ]
})
export class AddProjectModule { }
