import { Component } from '@angular/core';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { ButtonComponent } from '../../components/button/button.component'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TokenService } from '../../services/token/token.service';

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
  respostaApi: any;
  form: FormGroup; 

  constructor(private router: Router, private title: Title, private fb: FormBuilder, private http: HttpClient,
    private tokenService: TokenService) { 
    this.form = this.fb.group({
      nomeUser: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]], // apenas letras
      senha1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]]
    });
  }

  onSubmit() { 
    if (this.form.valid) { 
        this.erroNomeUser = false;
        this.erroSenha1 = false;
        this.enviarDadosLogin();

    } else { 
      console.log("Formulário inválido"); 
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
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }
}
