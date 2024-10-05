import { Component } from '@angular/core';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { ButtonComponent } from '../../components/button/button.component'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent { 
  userPassword: string = '';
  erroEmail: boolean = false;
  erroSenha1: boolean = false; 
  respostaApi: any;
  form: FormGroup; 

  constructor(private router: Router, private title: Title, private fb: FormBuilder, private http: HttpClient) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]]
    });
  }

  onSubmit() { 
    if (this.form.valid) { 
        this.erroEmail = false;
        this.erroSenha1 = false;
        this.enviarDadosLogin();

    } else { 
      console.log("Formulário inválido"); 
      this.form.controls['email'].invalid ? this.erroEmail = true : this.erroEmail = false;
      this.form.controls['senha1'].invalid ? this.erroSenha1 = true : this.erroSenha1 = false;
    }
  }

  enviarDadosLogin(): void { 
    const dados = {
      email: this.form.controls['email'].value,
      password: this.form.controls['senha1'].value
    }; 

    const url: string = "http://127.0.0.1:8000/api/v1/register/"; 

    this.http.post<any>(url, dados).subscribe({
      next: (response) => {
        this.respostaApi = response; // Processa a resposta da API
        console.log(this.respostaApi); 
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err); // Lida com erros
      }
    });
  }
}
