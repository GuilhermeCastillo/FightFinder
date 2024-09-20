import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { Title } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent],
  providers: [
    provideNgxMask({
      validation: false,  // Ou outras configurações que você quiser
    }),
  ],
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
