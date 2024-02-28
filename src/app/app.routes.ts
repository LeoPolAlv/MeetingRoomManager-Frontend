import { Routes } from '@angular/router';

export const routes: Routes = [
    //{ path: '', component: LoginComponent}
    { path: '', loadComponent: () => import('./pages/auth/login/login.component').then( m => m.LoginComponent) },
    //{ path: 'home', loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent) }
    { path: 'home' , loadChildren: () => import('./pages/home/home-routing-routing.module').then( m => m.HomeRoutingRoutingModule) }
    //{ path:' ', redirectTo: 'auth' },
    //{ path:'**', redirectTo: '' },
];
