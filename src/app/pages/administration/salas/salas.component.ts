import { Component, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ListboxModule } from 'primeng/listbox';
//import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';

import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SalaResponce } from 'src/app/core/interfaces/sala-responce';
import { SalasService } from 'src/app/core/services/salas.service';
import { SalaRequest } from 'src/app/core/interfaces/sala-request';
//import { Planta } from 'src/app/core/interfaces/shared';

interface Planta {
  name: string;
  code: string;
}

@Component({
  selector: 'app-salas',
  standalone: true,
  imports: [
    CommonModule,
    FieldsetModule,
    ButtonModule,
    MessagesModule,
    ListboxModule,
    FormsModule,
    ReactiveFormsModule,
    InputNumberModule,
    ListboxModule
  ],
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css'],
  providers: [MessageService]
})
export default class SalasComponent implements OnInit{

  salaForm: FormGroup;

  salas!: SalaResponce[];
  plantas!: Planta[];

  selectedPlanta!: Planta | undefined;

  selectedSala!: SalaResponce;

  accRealizar: any;

  disabled: boolean = false;
  hidden: boolean = false;
  buttonDisabled: boolean = false;
  accion: string = "";
  name: string = "";
  titulo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private salaService: SalasService
  ){
    this.accRealizar = this.router.getCurrentNavigation()?.extras.state;
    //console.log('Accion a realizar en equipamiento: ', this.accRealizar);
    //Si no hay accion a realizar en la pagina me voy a la principal para reiniciar operacion.
    if(!this.accRealizar){
      //console.log("Me voy a home")
      this.router.navigate(['home']);
    } else {
      this.accion = this.accRealizar.accion;
      //console.log("Constructor")
    }

    this.salaForm = this.formBuilder.group({
      idSala: [{
       value: 0,
       //disabled: true
      }, Validators.required],
      nombreSala:["", Validators.required],
      descripcion: ["",Validators.required],
      capacidad:["1", Validators.required],
      ubicacion:["",Validators.required],
      });
  }
  ngOnInit(): void {
    
    this.cargarPlantas();
    this.etiquetas(this.accion);

    //Deshabilitamos el boton de accion
    this.disabled = true;
    //damos valor 0 inicial al campo ID.
    this.salaForm.controls['idSala'].setValue(0);
    this.salaForm.controls['idSala'].disable();

    //Ocultamos para la accion NEW el div de busqueda de Roles.
    this.hidden = false;

    if(this.accion =='new'){
      this.hidden = true;
      this.disabled = false;
    }

    if (this.accion != 'new'){
      this.cargarSalas();
    }
  }


  cargarPlantas(){
    this.plantas = [
      { name: 'Planta 1ª', code: 'P1' },
      { name: 'Planta 2ª', code: 'P2' },
      { name: 'Planta 3ª', code: 'P3' },
      { name: 'Sotano 1', code: 'S1' },
      { name: 'Sotano 2', code: 'S2' },
      { name: 'Sotano 3', code: 'S3' }
    ];
  }

  etiquetas(acc: string){
    switch(acc){
      case 'new':
        this.name = "Crear";
        this.titulo = "Nueva Sala"
        break;
      case 'upd':
        this.name = "Actualizar";
        this.titulo = "Actualizar Datos Sala"
        break;
      case 'del':
        this.name = "Borrar";
        this.titulo = "Borrar Sala"
        break;
      default:
        this.name = "";
        this.titulo = ""
        break;
    }
  }

  cargarSalas(){
    this.salaService.buscarsalas().subscribe({
      next: (salas:SalaResponce[]) =>{
        //console.log("Salas recibidas: ", salas);
        this.salas = salas !== undefined ? salas : [];
        //console.log("Salas recibidas despues: ", this.salas);
      },
      error: (err: any) => {
        console.log("Error al recibir info de las Salas: ", err);
      },
      complete: () => {}
    });
  }

  onSubmit() {
    switch(this.accion){
      case 'new':{
        //console.log("estamos en un caso de alta de sala: ", this.salaForm.value);
        this.salaService.altaSala(this.salaForm.value).subscribe({
          next: (newSala: SalaResponce) => { 
                  this.cargarFormulario(newSala);
                  this.messageService.add({severity:'success', summary:'Alta Sala', detail:`Sala ${newSala.nombreSala} registrada en el sistema`});
                },
          error: (error: any) => { 
            console.log("Error al cargar la sala: ", error);
            this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: error.mensaje});
          },
          complete: () => { 
            //deshabilitamos los campos del form para que no puedan modificarse
            this.disabledCampos();
          }
        });
        break;
      }
      case 'upd': {
        //console.log("estamos actualizando los datos de un equipamiento");
        if(this.salaForm.controls['idSala'].value != 0){
          console.log("identificador distinto a 0");
          console.log("Valores del formulario: ", this.salaForm.value)
          this.selectedSala.nombreSala = this.salaForm.controls['nombreSala'].value;
          this.selectedSala.descripcion = this.salaForm.controls['descripcion'].value;
          this.selectedSala.capacidad = this.salaForm.controls['capacidad'].value;
          this.selectedSala.ubicacion = this.salaForm.controls['ubicacion'].value;

          console.log("Registro seleccionado: ", this.selectedSala);
          this.salaService.updateSala(this.selectedSala).subscribe({
            next: (updEquipo: SalaResponce) => {
              //console.log("Equipo actualizado: ", updEquipo);
              this.messageService.add({severity:'success', summary:'Actualizacion Datos Sala', detail:`Sala ${updEquipo.nombreSala} actualizada correctamente`});
            },
            error: (err: any) => {
              this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
            },
            complete: () => {
              this.cargarSalas();
              this.disabledCampos();
            }
          });
        } else {
          console.log("identificador igual a 0: ");
        }
        break;
      }
      case 'del':{
       // console.log("estamos en un caso de delete de equipamiento");
        this.salaService.deleteSala(this.selectedSala.idSala).subscribe({
          next: (data:any) => { 
         //   console.log("Datos recibidos: ", data);
            this.messageService.add({severity:'success', summary:'Borrar Sala', detail: data['Mensaje']});
          },
          error: (err: any) => {
           // console.log( "Error al borrar rol: ", err );
            this.messageService.add({severity:'error', summary:'Error en Campos de entrada', detail: err.error.mensajeError});
          },
          complete: () =>{
             // console.log ("Se ha completado el borrado del Equipo") 
              this.cargarSalas();
              this.disabledCampos();
              this.salaForm.controls['idSala'].setValue(0);
              this.salaForm.controls['nombreSala'].setValue("");
              this.salaForm.controls['descripcion'].setValue("");
              this.salaForm.controls['capacidad'].setValue("1");
          }
        });
        break;
      }
    }
  }

  volver(){
    this.router.navigateByUrl("home");
  }

  salaSeleccionado(sala: any){
    //console.log("sala Seleccionada: ", sala.value);
    this.cargarFormulario(sala.value);
    this.enableCampos();
  }

  cargarFormulario(sala:SalaResponce){
    this.salaForm.controls['idSala'].setValue(sala.idSala);
    this.salaForm.controls['nombreSala'].setValue(sala.nombreSala);
    this.salaForm.controls['descripcion'].setValue(sala.descripcion);
    this.salaForm.controls['ubicacion'].setValue(sala.ubicacion);
    this.salaForm.controls['capacidad'].setValue(sala.capacidad);

    this.selectedSala = sala
  }

  disabledCampos(){
    this.disabled = true;
    this.salaForm.controls['descripcion'].disable();
    this.salaForm.controls['nombreSala'].disable();
    this.salaForm.controls['ubicacion'].disable();
    this.salaForm.controls['capacidad'].disable();
  }

  enableCampos(){
    this.disabled = false;
    this.salaForm.controls['descripcion'].enable();
    this.salaForm.controls['nombreSala'].enable();
    this.salaForm.controls['ubicacion'].enable();
    this.salaForm.controls['capacidad'].enable();
  }
}
