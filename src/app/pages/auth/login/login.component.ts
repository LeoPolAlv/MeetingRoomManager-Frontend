import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

//import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { JwtInterceptor } from 'src/app/core/interceptors/jwt.interceptor';
import { JwtResponce, LoginRequest } from 'src/app/core/interfaces/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorMensaje } from 'src/app/core/interfaces/error';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            //ToastModule,
            MessagesModule,
            PasswordModule,
            InputTextModule,
            CheckboxModule,
            ButtonModule,
  //          BrowserAnimationsModule
           ],
  providers: [MessageService, AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginJwt$!: Observable<JwtResponce>

  message!: Message;
  
  username: string = '';
  password: string = '';
  recuerda: boolean = false;
  disabledButton: boolean = false;

  loginAux!: LoginRequest;
  formLogin!: FormGroup;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private authService: AuthService,
  ){
    this.inicializarForm();
  }
  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
    console.log("recuaerda: ", localStorage.getItem('RcdTkMttRmMng'))
    this.formLogin = this.fb.group({
      username: [this.authService.usuario, Validators.required],
      //username: ["", [Validators.required,Validators.email]],
      password: ["",[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      recuerda: [localStorage.getItem('RcdTkMttRmMng')?true:false, Validators.required]
      //recuerda: [false,]
    });
  }


  login(){
    this.messageService.clear();
    this.loginAux= {
      username: this.formLogin.controls['username']?.value,
      password: this.formLogin.controls['password']?.value
    }
    //loginAux.password = this.formLogin.get('password')?.value;
    //console.log('esto me envia el form de Login: ', this.formLogin.controls['username'].value);
    //console.log('esto me envia el username de Login: ', this.loginAux);
    //this.loginJwt$ = this.authService.login(loginAux);
    this.authService.login(this.loginAux).subscribe({
      next: (jwt: any) => {
        let token = jwt['jwt']
        //console.log("Recibo este token: ", token)
        this.authService.setToken(token);
        //console.log("Recojo el token del almacen: ", this.authService.getToken());
      },
      error: (err: any) => {
        //this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: 'Usuario y/o contraseña invalidos'});
        console.log("Error al hacer Login: ", err);
        this.messageService.add({severity:'error', summary:'Login', closable:false, detail:`${err.code} - ${err.mensaje}`});
        console.log("Error al hacer Login: ", err);
      },
      complete: () => {
        //AQUI REDIRIjo a la pagina principal de la web
        console.log("completed")
        if(this.formLogin.get('recuerda')?.value){
          //console.log("Valor recuerda: ", this.formLogin.get('recuerda')?.value)
          localStorage.setItem('RcdTkMttRmMng', this.formLogin.get('recuerda')?.value );
          this.authService.setusuario(this.formLogin.get('username')?.value)
        } else {
          //console.log("Valor recuerda: ", this.formLogin.get('recuerda')?.value)
          localStorage.removeItem('RcdTkMttRmMng');
          localStorage.removeItem('UsrTkMttRmMng');
        }
        //this.formLogin.reset();

      }
    });
    //console.log("LOGINNNN!!!!")
  }
}
