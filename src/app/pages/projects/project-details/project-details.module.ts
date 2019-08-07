import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/components/table/table.module';
import { AddUserModule } from '../add-user/add-user.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { NzButtonModule, NzIconModule, NzModalModule } from 'ng-zorro-antd';

const routes: Routes = [
  {path: '', component: ProjectDetailsComponent}
]

@NgModule({
  declarations: [
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    AddUserModule,
    UploadFileModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule
  ],
  exports: [
    ProjectDetailsComponent
  ]
})
export class ProjectDetailsModule { }
