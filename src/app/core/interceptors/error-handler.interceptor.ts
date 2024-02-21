import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorMensaje } from '../interfaces/error';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  errorMensaje!: ErrorMensaje;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = "";

      console.log("Estoy en el interceptor de error: ", error)
      if (error.error instanceof ErrorEvent) {
        console.log("Es un error Event")
        errorMessage = `Error: ${error.error.message}`;
      } else {
        console.log("Error del interceptor: ", error.error)
        this.errorMensaje = {
          fecha: error.error.fecha,
          mensaje: error.error.mensaje,
          code: error.error.code,
          url: error.error.url
        }
        console.log("ErrorMensaje: ", this.errorMensaje);
        errorMessage = `Error code: ${error.error.code}, message: ${error.error.mensaje}`;
      }
      return throwError(() => this.errorMensaje);
    }));
    /*
    .pipe(

      catchError( (err: HttpErrorResponse) =>  {
        if (err) {
          switch (err.status) {
            case 400:
              break;
            case 401:
              break;
            default:
              break;
          }
          throw err;
      }
    */
  }
}
