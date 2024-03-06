import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

const routes: Routes = [
  { path: '', data:{roles: AuthService.prototype.rol}, loadComponent: () => import('../../componentes/tarjetas/tarjetas.component').then( m => m.TarjetasComponent) },
  { path: 'equipamiento', loadComponent: () => import('../administration/equipamiento/equipamiento.component').then( m => m.EquipamientoComponent) },
  { path: 'salas', loadComponent: () => import('../administration/salas/salas.component').then( m => m.SalasComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
