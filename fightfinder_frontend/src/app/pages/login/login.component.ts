import { Component } from '@angular/core';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { ButtonComponent } from '../../components/button/button.component'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ButtonComponent, InputSenhaComponent, InputTextoComponent, CommonModule, HttpClientModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent { 
  userPassword: string = '';
  respostaApi: any;

  constructor(private router: Router, private http: HttpClient) { } 

  entrar(): void {
    this.router.navigate(['/home']);
  }

  enviarDados(): void {
    var email: string = "abcdeImpactay@gmail.com";
    var username: string = "CelioTakaiRobson";
    var password: string = "impactaCelioTakai123";
    var password2: string = "impactaCelioTakai123";
 
    const dados = {
      email: email,
      username: username,
      password: password,
      password2: password2
    }; 

    const url: string = "http://127.0.0.1:8000/api/v1/register/"; 

    this.http.post<any>(url, dados).subscribe({
      next: (response) => {
        this.respostaApi = response; // Processa a resposta da API
        console.log(this.respostaApi);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err); // Lida com erros
      }
    });
  }
}
