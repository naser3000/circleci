import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { Routes, RouterModule } from '@angular/router';
import { TableModule } from 'src/app/components/table/table.module';

const routes: Routes = [
  {path: '', component: ProjectsComponent},
  {path: ':id', loadChildren: './project-details/project-details.module#ProjectDetailsModule'},
];

@NgModule({
  declarations: [
    ProjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
