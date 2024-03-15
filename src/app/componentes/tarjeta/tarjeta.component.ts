import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    //RouterModule
  ],
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit{

  rutaSrc: string = './../../../assets/images/'
  src: string = '';
  alt: string = '';
  header: string = '';
  subheader: string = '';
  tarjeta: string = '';

  @Input() 
    item!: String; 
  
  constructor(
    private router: Router,
  ){}
  
  ngOnInit(): void {
    //console.log("Rol en tarjeta: ", this.item);
    switch(this.item){
      case 'BASIC': {
        //console.log("Estoy en Rol Basic")
        this.src = `${this.rutaSrc}Reservas.svg`;
        this.alt = 'Reservas';
        this.header = 'Reservas';
        this.subheader = 'Gestion de Reservas';
        this.tarjeta = 'RE';

        break;
      }
      case 'USUARIO':{
        //console.log("Estoy en Rol Usuario");
        this.src = `${this.rutaSrc}Usuario.svg`;
        this.alt = 'Usuarios';
        this.header = 'Usuarios';
        this.subheader = 'Gestion de usuarios';
        this.tarjeta = 'US';

        break;
      }
      case 'EQUIPO':{
        //console.log("Estoy en Rol Equipo");
        this.src = `${this.rutaSrc}Equipamiento.svg`;
        this.alt = 'Equipamiento';
        this.header = 'Equipamiento';
        this.subheader = 'Gestion de Equipamientos';
        this.tarjeta = 'EQ';

        break;
      }
      case 'SALA':{
        //console.log("Estoy en Rol Sala");
        this.src = `${this.rutaSrc}Salas.svg`;
        this.alt = 'Salas';
        this.header = 'Salas';
        this.subheader = 'Gestion de Salas';
        this.tarjeta = 'SA';

        break;
      }
      case 'OFICINA':{
        //console.log("Estoy en Rol Oficina");
        this.src = `${this.rutaSrc}Oficina.svg`;
        this.alt = 'Oficina';
        this.header = 'Oficinas';
        this.subheader = 'Gestion de Oficinas';
        this.tarjeta = 'OF';

        break;
      }
      default:{
        //console.log("Otros casos");
        this.src = '';
        this.alt = '';
        this.header = '';
        this.subheader = '';
        this.tarjeta = '';

        break;
      }
    }
  }

  gestAccion(accion: string, tarjeta:any){
    //console.log("Accion a arealizar: ", accion);
    //console.log("Evento que recibo: ", tarjeta);

    let url: string = '';

    switch(tarjeta){
      case 'EQ':
        //console.log("Entro por equipamiento en tarjeta");
        url = '/home/equipamiento';
        break;

      case 'US':
        break;
      case 'SA':
        //console.log("Entro por salas en tarjeta");
        url = '/home/salas';
        break;

      case 'RE':
        break;
      case 'OF':
        break;
      default:
        break;
    }

    this.router.navigateByUrl(url,{state: {accion: accion}});
    
  }
}
