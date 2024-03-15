import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path:'', component: HomeComponent, title: 'Reserva Sala', loadChildren: () => import ('../administration/administration-routing.module') }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export default class HomeRoutingRoutingModule { }
