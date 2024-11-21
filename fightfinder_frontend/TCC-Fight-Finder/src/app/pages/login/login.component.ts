import { Component } from '@angular/core';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { ButtonComponent } from '../../components/button/button.component'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ButtonComponent, InputSenhaComponent, InputTextoComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }

  entrar(): void {
    this.router.navigate(['/home']);
  }
}
