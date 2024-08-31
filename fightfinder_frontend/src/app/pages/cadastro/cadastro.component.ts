import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { InputDataComponent } from '../../components/input-data/input-data.component';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, InputDataComponent, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  selectedDate: string = '';
  constructor(private router: Router, private title: Title) { }
  
  ngOnInit(): void {
    this.title.setTitle('Cadastro');
  }


  entrar(): void {
    console.log('FUI CHAMADO');
    this.router.navigate(['/home']);
  }

}
