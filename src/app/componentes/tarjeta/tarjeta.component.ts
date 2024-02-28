import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule
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

  @Input() 
    item!: String; 
  
  constructor(){}
  
  ngOnInit(): void {
    console.log("Rol en tarjeta: ", this.item);
    switch(this.item){
      case 'BASIC': {
        console.log("Estoy en Rol Basic")
        this.src = `${this.rutaSrc}Reservas.svg`;
        this.alt = 'Reservas';
        this.header = 'Reservas';
        this.subheader = 'Gestion de Reservas';

        break;
      }
      case 'USUARIO':{
        console.log("Estoy en Rol Usuario");
        this.src = `${this.rutaSrc}Usuario.svg`;
        this.alt = 'Usuarios';
        this.header = 'Usuarios';
        this.subheader = 'Gestion de usuarios';

        break;
      }
      case 'EQUIPO':{
        console.log("Estoy en Rol Equipo");
        this.src = `${this.rutaSrc}Equipamiento.svg`;
        this.alt = 'Equipamiento';
        this.header = 'Equipamiento';
        this.subheader = 'Gestion de Equipamientos';

        break;
      }
      case 'SALA':{
        console.log("Estoy en Rol Sala");
        this.src = `${this.rutaSrc}Salas.svg`;
        this.alt = 'Salas';
        this.header = 'Salas';
        this.subheader = 'Gestion de Salas';

        break;
      }
      case 'OFICINA':{
        console.log("Estoy en Rol Oficina");
        this.src = `${this.rutaSrc}Oficina.svg`;
        this.alt = 'Oficina';
        this.header = 'Oficinas';
        this.subheader = 'Gaestion de Oficinas';

        break;
      }
      default:{
        console.log("Otros casos");
        this.src = '';
        this.alt = '';
        this.header = '';
        this.subheader = '';

        break;
      }
    }
  }

  gestAccion(accion: string){
    console.log("Accion a arealizar: ", accion);
  }
}
