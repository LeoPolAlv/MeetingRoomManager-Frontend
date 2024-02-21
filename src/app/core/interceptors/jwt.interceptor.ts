import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/*
* Este elememnto intercepta las peticiones que hacemos al servidor y nos agrega el token que sera validado en el servidor.
* Lo que hace es clonar la cabecera original y luego inserta el token en ella y se envia al servidor.
*/

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //console.log("Estoy en JWTINTERCEPTOR")
    request = request.clone({
              setHeaders: {
              Authorization: `Bearer ${this.authService.getToken()}`
              }
    });
    return next.handle(request);
  }
}
