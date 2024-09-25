import { Component, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { Title } from '@angular/platform-browser';
import { FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent, FormsModule, CommonModule],
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
  submitted: boolean = false;

  perfil!: HTMLInputElement; 
  // email!: HTMLInputElement;
  // senha!: HTMLInputElement;
  // confirmarSenha!: HTMLInputElement;
  // termoIdade!: HTMLInputElement;
  // termoLGPD!: HTMLInputElement;

  selectedDate: string = '';
  form: FormGroup;
  constructor(private router: Router, private title: Title) { 

      this.form = new FormGroup({
          escolha: new FormControl('', Validators.required)
      })
  }
  
  ngOnInit(): void {
    this.title.setTitle('Cadastro');
  }


 


  entrar(): void { 
    // console.log("atleta: ", this.atleta);
    // console.log("agente: ", this.agente);
    // console.log("email: ", this.email);
    // console.log("senha: ", this.senha);
    // console.log("confirmarSenha: ", this.confirmarSenha);
    // console.log("termoIdade: ", termoIdade);
    // console.log("termoLGPD: ", termoLGPD);

    // if ( (atleta || agente) && email && senha && confirmarSenha && termoIdade && termoLGPD) { 
    //   this.router.navigate(['/home']);
    //   return;
    // } 
    console.log('this.perfil: ', this.perfil);

    if (this.perfil) {
      this.router.navigate(['/home']);
      return;
    } 
     
    console.log('PREENCHA TODOS OS CAMPOS!');
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
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
