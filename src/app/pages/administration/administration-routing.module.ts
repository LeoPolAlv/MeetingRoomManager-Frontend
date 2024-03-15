import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

const routes: Routes = [
  { path: '', data:{roles: AuthService.prototype.rol}, loadComponent: () => import('../../componentes/tarjetas/tarjetas.component') },
  { path: 'equipamiento', loadComponent: () => import('../administration/equipamiento/equipamiento.component') },
  { path: 'salas', loadComponent: () => import('../administration/salas/salas.component') },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class AdministrationRoutingModule { }
