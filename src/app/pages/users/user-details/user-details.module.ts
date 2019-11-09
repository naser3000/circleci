import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { Routes, RouterModule } from '@angular/router';
import { NzTabsModule } from 'ng-zorro-antd';

const routes: Routes = [
  { path: '', component: UserDetailsComponent }
]

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzTabsModule
  ]
})
export class UserDetailsModule { }
