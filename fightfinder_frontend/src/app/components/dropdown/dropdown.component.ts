import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent {
  @Input() options: string[] = []; // Lista de opções recebida como entrada  
  @Input() selectedOption: string | null = null; // Opção selecionada
  @Input() disabled: boolean = false;
  value: string = '';
  @Input() id: string = "";

  @Output() optionSelected = new EventEmitter<string>(); // Evento para emitir a opção selecionada
   
  ngOnInit() {
    if (this.options.length > 0) {
      this.selectedOption = this.options[0];
    }
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? null;
  
    if (value) {
      this.selectedOption = value;
      this.optionSelected.emit(value);
    }
  }

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
