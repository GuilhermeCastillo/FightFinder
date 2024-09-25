import { Component, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { Title } from '@angular/platform-browser';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent, FormsModule],
  providers: [ 
      provideNgxMask({
        validation: false,
      }), 
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
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
    var atleta = (document.querySelector('#atletaRadio') as HTMLInputElement).value;
    var agente = (document.querySelector('#agenteRadio') as HTMLInputElement).value;
    var email = (document.querySelector('#inputEmail') as HTMLInputElement).value;
    var senha = (document.querySelector('#inputSenha') as HTMLInputElement).value;
    var confirmarSenha = (document.querySelector('#inputConfirmarSenha') as HTMLInputElement).value;
    var termoIdade = (document.querySelector('#termoIdade') as HTMLInputElement).value;
    var termoLGPD = (document.querySelector('#termoLGPD') as HTMLInputElement).value;

    console.log("atleta: ", atleta);
    console.log("agente: ", agente);
    console.log("email: ", email);
    console.log("senha: ", senha);
    console.log("confirmarSenha: ", confirmarSenha);
    console.log("termoIdade: ", termoIdade);
    console.log("termoLGPD: ", termoLGPD);

    if ( (atleta || agente) && email && senha && confirmarSenha && termoIdade && termoLGPD) { 
      this.router.navigate(['/home']);
      return;
    } 
     
    console.log('PREENCHA TODOS OS CAMPOS!');
  }


  value: any;

  // Funções requeridas pelo ControlValueAccessor
  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Código para desativar o componente, se necessário
  }

  // Chame isso quando o valor mudar no seu componente (ex: quando o rádio for selecionado)
  handleInputChange(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

}
