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
import { JwtResponce, LoginRequest } from 'src/app/core/interfaces/login';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,
            ReactiveFormsModule,
            FormsModule,
            MessagesModule,
            PasswordModule,
            InputTextModule,
            CheckboxModule,
            ButtonModule,
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
    private router: Router
  ){
    this.inicializarForm();
  }
  ngOnInit(): void {
    this.inicializarForm();
  }

  inicializarForm(){
    //console.log("recuaerda: ", localStorage.getItem('RcdTkMttRmMng'))
    this.formLogin = this.fb.group({
      username: [this.authService.usuario, Validators.required],
      password: ["",[Validators.required,Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      recuerda: [localStorage.getItem('RcdTkMttRmMng')?true:false, Validators.required]
    });
  }


  login(){
    this.messageService.clear();
    this.loginAux= {
      username: this.formLogin.controls['username']?.value,
      password: this.formLogin.controls['password']?.value
    }
    this.authService.login(this.loginAux).subscribe({
      next: (jwt: any) => {
        let token = jwt['jwt']
        this.authService.setToken(token);
      },
      error: (err: any) => {
        this.messageService.add({severity:'error', summary:'Login', closable:false, detail:`${err.code} - ${err.mensaje}`});
      },
      complete: () => {
        if(this.formLogin.get('recuerda')?.value){
          localStorage.setItem('RcdTkMttRmMng', this.formLogin.get('recuerda')?.value );
          this.authService.setusuario(this.formLogin.get('username')?.value)
        } else {
          localStorage.removeItem('RcdTkMttRmMng');
          localStorage.removeItem('UsrTkMttRmMng');
        }
        //console.log("Autorities del user: ", this.authService.rol)
        this.router.navigateByUrl('/home');
        //this.router.navigateByUrl('/home',{state: {roles: this.authService.rol}});
      }
    });
  }
}
