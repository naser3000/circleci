import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { NzModalModule, NzUploadModule, NzButtonModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    NzModalModule,
    NzUploadModule,
    NzButtonModule
  ],
  exports: [
    UploadFileComponent
  ]
})
export class UploadFileModule { }
