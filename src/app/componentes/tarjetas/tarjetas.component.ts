import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from '../tarjeta/tarjeta.component';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{

  @Input()
  roles!: string[];
  roleItems: string[] = [];
  //itemp = 'manuel'
  //list: String[] = ["equipamiento", "usuario","oficina"]
  constructor(){}

  ngOnInit(): void {
    console.log("Roles en Tarjetas: ", this.roles[0]);
    this.roleItems.push(this.roles[0]);
    console.log("RoleItems en Tarjetas: ", this.roleItems);
  }


}
