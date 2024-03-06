import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtResponce, LoginRequest } from '../interfaces/login';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

interface TOKEN
{
  "sub": string,
  "roles": string[],
  "iat": number,
  "exp": number
}

const TOKEN_KEY = 'TkMttRmMng';
const USERNAME_KEY = 'UsrTkMttRmMng';
const AUTHORITIES_KEY = 'AuthTkMttRmMng';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  public token!: string;
  public roles: Array<string> = [];

  constructor(
    private http: HttpClient
  ) { }

  public login(loginUsuario: LoginRequest): Observable<JwtResponce> {
    let url = `http://localhost:8080/auth/login`;
    return this.http.post<JwtResponce>(url, loginUsuario);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  public setToken(token: string) {
    return localStorage.setItem(TOKEN_KEY, token);
  }

  public deleteToken(){
    localStorage.removeItem(TOKEN_KEY);
  }

  /**
  * Validamos que exita un token creado 
  * @returns false si no hay token creado. True si lo hay
  */
  vaidarToken(): boolean{
    this.token = this.getToken();
    return this.token ? true : false;
  }

  get usuario(): string | null{
    return localStorage.getItem(USERNAME_KEY) ? localStorage.getItem(USERNAME_KEY) : '';
  }

  setusuario(usuario: string){
    localStorage.setItem(USERNAME_KEY,usuario);
  }

  get rol(){
    let roleToken: string[] = [];
    if(this.vaidarToken()){
      let tokenRole: TOKEN = jwtDecode (this.getToken());
      roleToken = tokenRole.roles;
     // console.log('Role obtenido: ', roleToken);  
    }
    return roleToken;
  }
/*
  public setAuthorities(authorities: string[]): void {
    localStorage.removeItem(AUTHORITIES_KEY);
    localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  get authorities(): string[] {
    this.roles = [];
    if (localStorage.getItem(AUTHORITIES_KEY)) {
       const value: any = localStorage.getItem(AUTHORITIES_KEY);
       value.forEach((authority:any) => {
         this.roles.push(authority.authority);
      });
    } 
    return this.roles;
  }*/
}
