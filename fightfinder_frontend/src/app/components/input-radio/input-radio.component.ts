import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'; 

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
  ]
})
export class InputRadioComponent implements ControlValueAccessor { 
  
  @Input() type: string = 'radio';  
  @Input() textoRadio: string = '';  
  @Input() value: string = ''; 
  @Input() name: string = '';  
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {   }
  
  selectedValue: string | null = null;
  isDisabled: boolean = false;

  // Função que será chamada quando o valor mudar
  private onChange: any = () => {};
  // Função que será chamada quando o controle for tocado
  private onTouched: any = () => {};

  // Método obrigatório para escrever o valor no componente
  writeValue(value: string): void {
    this.selectedValue = value;
  }

  // Método para registrar quando o valor mudar
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Método para registrar quando o controle é tocado
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Método para desabilitar o componente
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Método chamado quando o usuário seleciona uma opção
  onSelect(): void {
    this.onChange(this.value); // Propaga o valor selecionado
    this.onTouched(); // Marca o campo como tocado
  }
}
