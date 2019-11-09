import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NzTabsModule, NzButtonModule, NzFormModule, NzInputModule, NzMessageModule } from 'ng-zorro-antd';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: UserDetailsComponent }
]

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NzTabsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzMessageModule
  ]
})
export class UserDetailsModule { }
