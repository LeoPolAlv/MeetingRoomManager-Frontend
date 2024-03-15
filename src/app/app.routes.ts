import { Routes } from '@angular/router';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
    { path: '', title:"Login", loadComponent: () => import('./pages/auth/login/login.component') },
    { path: 'home' ,loadChildren: () => import('./pages/home/home-routing-routing.module') },
];
