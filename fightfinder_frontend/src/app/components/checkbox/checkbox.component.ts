import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
}) 

export class CheckboxComponent implements ControlValueAccessor {
    @Input() label: string = '';  // Texto associado ao checkbox
  
    checked: boolean = false;
    
    // Funções que o Angular vai passar para atualizar o estado
    private onChange: any = () => {};
    private onTouched: any = () => {};
  
    // Métodos da interface ControlValueAccessor:
    
    // Escreve o valor do modelo no componente
    writeValue(value: boolean): void {
      this.checked = value;
    }
  
    // Registra a função que será chamada sempre que o valor mudar
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
  
    // Registra a função que será chamada quando o componente for "tocado"
    registerOnTouched(fn: any): void {
      this.onTouched = fn;
    }
  
    // Habilita/desabilita o componente
    // setDisabledState?(isDisabled: boolean): void {
    //   this.disabled = isDisabled;
    // }
  
    // Método que será chamado quando o checkbox for clicado
    toggleCheckbox() {
      this.checked = !this.checked;
      this.onChange(this.checked);  // Atualiza o valor no formulário
      this.onTouched();             // Marca o campo como tocado
    }

}
