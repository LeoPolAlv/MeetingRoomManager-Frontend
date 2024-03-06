import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path:'', component: HomeComponent, loadChildren: () => import ('../administration/administration-routing.module').then(m => m.AdministrationRoutingModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingRoutingModule { }
