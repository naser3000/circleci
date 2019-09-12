import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NzLayoutModule, NzMenuModule, NzToolTipModule, NzIconModule, NzAvatarModule, NzDropDownModule } from 'ng-zorro-antd';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '',      redirectTo: 'users' },
      { path: 'dashboard',      loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'projects',      loadChildren: './projects/projects.module#ProjectsModule' },
      { path: 'users',      loadChildren: './users/users.module#UsersModule' },
      { path: 'settings',      loadChildren: './setting/setting.module#SettingModule' },
    ]
  }
];

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzIconModule,
    NzAvatarModule,
    NzDropDownModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
