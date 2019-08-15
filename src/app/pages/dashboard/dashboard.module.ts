import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { NzMenuModule, NzButtonModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';

const routes: Routes = [
  {path: '', component: DashboardComponent}
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    NzToolTipModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
