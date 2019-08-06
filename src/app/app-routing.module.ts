import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'projects',      loadChildren: './pages/projects/projects.module#ProjectsModule' },
  { path: 'users',      loadChildren: './pages/users/users.module#UsersModule' },
  { path: '**',      redirectTo: 'projects', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
