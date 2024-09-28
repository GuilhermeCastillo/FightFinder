import { Component, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent, FormsModule, CommonModule, CheckboxComponent],
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
  erroRadio: boolean = false; 
  erroEmail: boolean = false;
  erroSenha1: boolean = false; 
  erroSenha2: boolean = false; 
  erroSenhasDiferentes: boolean = false; 
  erroTermo1: boolean = false; 
  erroTermo2: boolean = false;  
  selectedDate: string = '';
  form: FormGroup;

  constructor(private router: Router, private title: Title, private fb: FormBuilder) { 
    this.form = this.fb.group({
      radio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]],
      senha2: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]],
      termo1: ['', Validators.required],
      termo2: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.title.setTitle('Cadastro');
  }
  
  onSubmit() {
    console.log('form: ', this.form);

    if (this.form.valid 
      && this.form.controls['senha1'].value === this.form.controls['senha2'].value
      && this.form.controls['termo1'].value == true 
      && this.form.controls['termo2'].value == true) {

      console.log("Formulário válido!"); 
      this.erroRadio = false;
      this.erroEmail = false;
      this.erroSenha1 = false;
      this.erroSenha2 = false;
      this.erroSenhasDiferentes = false;  
      this.router.navigate(['/home']);
    } else {

      console.log("Formulário inválido"); 
      this.form.controls['radio'].invalid ? this.erroRadio = true : this.erroRadio = false;
      this.form.controls['email'].invalid ? this.erroEmail = true : this.erroEmail = false;
      this.form.controls['senha1'].invalid ? this.erroSenha1 = true : this.erroSenha1 = false;
      this.form.controls['senha2'].invalid ? this.erroSenha2 = true : this.erroSenha2 = false;
      this.form.controls['senha1'].value !== this.form.controls['senha2'].value ? this.erroSenhasDiferentes = true : this.erroSenhasDiferentes = false;
      this.form.controls['termo1'].invalid ? this.erroTermo1 = true : this.erroTermo1 = false; // não dá p confiar nisso aq nao
      this.form.controls['termo2'].invalid ? this.erroTermo2 = true : this.erroTermo2 = false; // não dá p confiar nisso aq nao
    }
  }
      
}
