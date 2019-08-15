import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard',      loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
  { path: 'projects',      loadChildren: './pages/projects/projects.module#ProjectsModule' },
  { path: 'users',      loadChildren: './pages/users/users.module#UsersModule' },
  { path: '**',      redirectTo: 'projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
