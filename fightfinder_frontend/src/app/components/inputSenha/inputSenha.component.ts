import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextoComponent } from '../input-texto/input-texto.component';

@Component({
  selector: 'app-input-senha',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextoComponent),
      multi: true
    }
  ],
  templateUrl: './InputSenha.component.html',
  styleUrl: './InputSenha.component.css'
})
export class InputSenhaComponent {
  @Input() password: string = '';
  @Input() type: string = 'password'; // Tipo do input  
  @Input() placeholder: string = '';  
  @Input() disabled: boolean = false;  
  @Output() valueChange = new EventEmitter<string>();
 
  value: string = ''; 
  passwordVisible: boolean = false;

  ngOnInit(): void {  }
 
  onChange = (value: string) => {};
  onTouched = () => {}; 

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);  // Notifica o Angular que o valor mudou
  } 
 
  // Métodos obrigatórios da interface ControlValueAccessor
  writeValue(value: string): void {
    this.value = value || '';  // Define o valor no input
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;  // Registra a função de mudança do Angular
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;  // Registra a função de toque do Angular
  }

  setDisabledState(isDisabled: boolean): void {
    // Adiciona lógica para desabilitar o input, se necessário
  } 
 
  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

}
