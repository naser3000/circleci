import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NzModalModule,
  NzUploadModule,
  NzButtonModule,
  NzFormModule,
  NzInputNumberModule,
  NzSelectModule 
} from 'ng-zorro-antd';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzModalModule,
    NzUploadModule,
    NzButtonModule,
    NzFormModule,
    NzSelectModule,
    NzInputNumberModule,
  ],
  exports: [
    UploadFileComponent
  ]
})
export class UploadFileModule { }
