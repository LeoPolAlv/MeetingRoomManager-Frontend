import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalaRequest } from '../interfaces/sala-request';
import { SalaResponce } from '../interfaces/sala-responce';
import { Planta } from '../interfaces/shared';

const URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class SalasService {

  plantas: Planta[] | undefined;

  constructor(
    private http: HttpClient,
  ) { }

  altaSala(newSala: SalaRequest){
    let url = `${URL}/sala/new`;
    return this.http.post<SalaResponce>(url,newSala);
  }
  get defPlantas(){
    return this.plantas = [
      { name: 'Planta 1ª', code: 'P1' },
      { name: 'Planta 2ª', code: 'P2' },
      { name: 'Planta 3ª', code: 'P3' },
      { name: 'Sotano 1', code: 'S1' },
      { name: 'Sotano 2', code: 'S2' },
      { name: 'Sotano 3', code: 'S3' }
    ];
  }

  buscarsalas(){
    let url = `${URL}/sala/`;
    return this.http.get<SalaResponce[]>(url);
  }

  updateSala(updtSala: SalaResponce){
    let url = `${URL}/sala/updt`;
    return this.http.put<SalaResponce>(url,updtSala);
  }

  deleteSala(id: number){
    let url = `${URL}/sala/delete/${id}`;
    return this.http.delete(url);
  }
}
