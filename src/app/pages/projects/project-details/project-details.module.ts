import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from './project-details.component';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/components/table/table.module';

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
    TableModule
  ],
  exports: [
    ProjectDetailsComponent
  ]
})
export class ProjectDetailsModule { }
