import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from 'src/environments/environment.development';
import { EquipoResponce } from '../interfaces/equipo-responce';
import { EquipoRequest } from '../interfaces/equipo-request';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class EquipamientoServiceService {

  constructor(
    private http: HttpClient
  ) { }

  buscarEquipos(){
    let url = `${URL}/equipo/`;
    return this.http.get<EquipoResponce[]>(url);
  }

  altaEquip(newEquipo:EquipoRequest){
    let url = `${URL}/equipo/new`;
    return this.http.post<EquipoResponce>(url,newEquipo);
  }

  updateEquipo(updtEquipo: EquipoRequest){
    let url = `${URL}/equipo/updt`;
    return this.http.put<EquipoResponce>(url,updtEquipo);
  }

  deleteEquipo(id: number){
    let url = `${URL}/equipo/delete/${id}`;
    return this.http.delete(url);
  }
}
