import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-texto',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective],
  providers: [
    provideNgxMask(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextoComponent),
      multi: true
    }
  ],
  templateUrl: './input-texto.component.html',
  styleUrl: './input-texto.component.css'
})

export class InputTextoComponent {
  @Input() type: string = 'text';
  @Input() isEditable: boolean = false;
   value: string = '';
  @Input() inputText: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() id: string = '';
  @Input() borderColor: string = 'var(--vermelho)';
  @Input() maxLength: number = 60;
  @Input() width: string = '18rem';
  @Input() mask: string = '';
  @Output() valueChange = new EventEmitter<string>(); 

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
}
