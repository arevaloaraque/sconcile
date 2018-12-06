import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../app/home/home.component';
import {LoginComponent} from './auth/login/login.component';
import { AuthGuard } from './_guards';

import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login',component:LoginComponent,data: { title: 'Login' } },

  { path: '', component: HomeComponent ,canActivate: [AuthGuard],
    children:[
      {
        path:'home', component: DashboardComponent,data:{title:'Home'}
      },
      {
        path: 'userprofile', component: UserProfileComponent ,data: { title: 'Profile' }
      }
    ]
  },
  // { path: 'home', component: HomeComponent ,canActivate: [AuthGuard],data: { title: 'Home' } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
