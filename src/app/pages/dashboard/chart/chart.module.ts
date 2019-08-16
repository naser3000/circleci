import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { NzButtonModule, NzIconModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
