import { Component, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MeetingRoomManager-Frontend';

  constructor(
    private router: Router
  ){}
/*
  Estamos eliminando el token del localstorage al cerrar pestaña o navegador
*/
//Con este decorador lo que hace es enviar un mensaje de confirmacion de si quieres recargar/salir la pagina.
// Una vez que das a recarga/salir se ejecuta el decorador de abajo.
//Cancelando no se ejcuta nada
  /*@HostListener('window:beforeunload', ['$event'])
    windowBeforeUnload(event: BeforeUnloadEvent) {
      console.log("Entra por beforeunload ")
       event.returnValue = "mensaje que envio Antes";  //-> si queremos que salga el mensaje de confirmacion se debe desasteriscar
    }

  @HostListener('window:unload')
    windowOnUnload() {
      console.log("Entro por unload") 
        //User pressed Reload/Leave.
        localStorage.removeItem('TkMttRmMng'); //--> salimos de la ventana borrando el token
        console.log("Borrado token")
        this.router.navigate([''])
        console.log("Nos vamos al inicio")
    }*/
}
