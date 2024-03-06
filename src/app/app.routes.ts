import { Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/auth/login/login.component').then( m => m.LoginComponent) },
    { path: 'home' ,loadChildren: () => import('./pages/home/home-routing-routing.module').then( m => m.HomeRoutingRoutingModule) },
];
