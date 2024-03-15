import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [
    CommonModule,
    TarjetaComponent
  ],
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export default class TarjetasComponent implements OnInit{

  //@Input()
  roles!: string[];
  roleItems: string[] = [];

  reolesAux: any;
  rolesH: string[] = [];

  //itemp = 'manuel'
  //list: String[] = ["equipamiento", "usuario","oficina"]
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    //console.log("Roles en Tarjetas: ", this.authService.rol);

    for( let i = 0; i < this.authService.rol.length; i++){
      //console.log("Elemento Leido: ", this.authService.rol[i]);
      this.roleItems.push(this.authService.rol[i]);
    }

    //console.log("RoleItems en Tarjetas: ", this.roleItems);
  }


}
