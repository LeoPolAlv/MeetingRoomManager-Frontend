import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from 'src/app/core/services/auth.service';

const routes: Routes = [
  { path:'login', providers:[AuthService] ,loadComponent: () => import ('./login/login.component').then(m => m.LoginComponent)},
  //{ path:'login', component:LoginComponent },
  { path:'**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
