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

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent, FormsModule, CommonModule,],
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
  selectedDate: string = '';
  form: FormGroup;
  constructor(private router: Router, private title: Title, private fb: FormBuilder) { 

    this.form = this.fb.group({
      radio: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9]*$')]]
    });
  }
  
  ngOnInit(): void {
    this.title.setTitle('Cadastro');
  }
  
  onSubmit() {
    console.log('form: ', this.form);
    if (this.form.valid) {
      console.log("Formulário válido", this.form.value);
    } else {
      console.log("Formulário inválido");
    }
  }
 
}
