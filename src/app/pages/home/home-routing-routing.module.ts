import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./../home/home.component').then( m => m.HomeComponent) },
  { path: 'equipamiento', loadComponent: () => import('./../equipamiento/equipamiento.component').then( m => m.EquipamientoComponent) },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingRoutingModule { }
