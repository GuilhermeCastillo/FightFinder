import { Component } from '@angular/core';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { ButtonComponent } from '../../components/button/button.component'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TokenService } from '../../services/token/token.service';
import Swal from 'sweetalert2';
import { UserPhotoService } from '../../services/UserPhoto/userPhotoService.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent { 
  userPassword: string = '';
  erroNomeUser: boolean = false;
  erroSenha1: boolean = false; 
  erroUsuarioSenhaInvaldos: boolean = false;
  respostaApi: any;
  form: FormGroup; 
  dadosPerfil: any;
  imagemPerfilUrl: string | ArrayBuffer | null = null;

  constructor(private router: Router, private title: Title, private fb: FormBuilder, private http: HttpClient,
    private tokenService: TokenService, private userPhotoService: UserPhotoService) { 
    this.form = this.fb.group({
      nomeUser: ['', [Validators.required, Validators.maxLength(30)]], // apenas letras
      senha1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]]
    });
  }

  ngOnInit() {
    this.title.setTitle('Login');
  }

  onSubmit() { 
    if (this.form.valid) { 
        this.erroNomeUser = false;
        this.erroSenha1 = false;
        this.enviarDadosLogin();

    } else {
      this.form.controls['nomeUser'].invalid ? this.erroNomeUser = true : this.erroNomeUser = false;
      this.form.controls['senha1'].invalid ? this.erroSenha1 = true : this.erroSenha1 = false;
    }
  }

  enviarDadosLogin(): void { 
    const dados = {
      username: this.form.controls['nomeUser'].value,
      password: this.form.controls['senha1'].value
    }; 

    const url: string = "http://127.0.0.1:8000/api/v1/authentication/token/"; 

    this.http.post<any>(url, dados).subscribe({
      next: (response) => {
        this.respostaApi = response; 
        this.tokenService.setToken(this.respostaApi['access']);
        this.router.navigate(['/home']);
        this.verificaSeCompletouCadastro();
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
        if (err.error.detail == "Usuário e/ou senha incorreto(s)") {
          this.erroUsuarioSenhaInvaldos = true;
        }
      }
    });
  }

  verificaSeCompletouCadastro() {
    const url = "http://127.0.0.1:8000/api/v1/athlete-profile-status/"
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
        next: (response) => {
          this.respostaApi = response;
          let completouCadastro = this.respostaApi['athlete_profile_complete'];
          if (completouCadastro) {
            this.loadUserPhoto()
          } else {
            this.alertaCompletarCadastro();
          }
        },
        error: (err) => {
          console.error('Erro ao enviar dados', err);
        }
    });
  }

  alertaCompletarCadastro() {
    Swal.fire({
      title: 'Dica',
      text: 'Complete seu cadastro na página de Perfil para acessar todas funcionalidades',
      icon: 'info', 
      confirmButtonText: 'Ok'}).then((result) => {
        if (result.isConfirmed) { 
          this.router.navigate(['/perfil']);
        } 
    }); 
  }

  loadUserPhoto() {
    const url = "http://127.0.0.1:8000/api/v1/athlete/profile/"
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
      next: (response) => {
        this.dadosPerfil = response;
        if (this.dadosPerfil.imagem) {
          this.imagemPerfilUrl = `http://127.0.0.1:8000/${this.dadosPerfil.imagem}`;
          this.userPhotoService.setPhotoUrl(String(this.imagemPerfilUrl));
        } else {
          this.imagemPerfilUrl = null;
        }
        const dadosUser = {
          nomeUser: this.dadosPerfil.nome
        };
        this.form.patchValue(dadosUser);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }
}
