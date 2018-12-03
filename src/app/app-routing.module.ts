import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';
import {LoginComponent} from './auth/login/login.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  { path: '', component: HomeComponent ,canActivate: [AuthGuard],data: { title: 'Home' }},
  { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],data: { title: 'Home' } },
  { path: 'login',component:LoginComponent,data: { title: 'Login' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
