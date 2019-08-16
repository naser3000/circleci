import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart.component';
import { NzButtonModule, NzIconModule, NzSelectModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    FormsModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
