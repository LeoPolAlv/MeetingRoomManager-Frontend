import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { Footer } from 'primeng/api';
import { FooterComponent } from 'src/app/sared/footer/footer.component';
import { HeaderComponent } from 'src/app/sared/header/header.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
//import { TarjetasComponent } from 'src/app/componentes/tarjetas/tarjetas.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  reolesAux: any;
  rolesH: string[] = [];

  constructor(
    //private route: ActivatedRoute,
    //private router: Router
  ){
    /*this.route.data.subscribe( data => {
      console.log("Roles que leo desde data: ", data);
      this.reolesAux = data;
    })

    //this.reolesAux = this.router.getCurrentNavigation()?.extras.state;

    for( let i = 0; i < this.reolesAux.roles.length; i++){
      console.log("Elemento Leido: ", this.reolesAux.roles[i]);
      this.rolesH.push(this.reolesAux.roles[i]);
    }
    */
  }

  ngOnInit(): void { }

}
