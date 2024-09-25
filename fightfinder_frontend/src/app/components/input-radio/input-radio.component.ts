import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms'; 

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [ FormsModule],
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
  
  writeValue(obj: any): void { 
  }
  registerOnChange(fn: any): void { 
  }
  registerOnTouched(fn: any): void { 
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log('MÉTODO NÃO IMPLEMENTADO');
  }
  @Input() type: string = 'radio';  
  @Input() textoRadio: string = '';  
  @Input() value: string = ''; 
  @Input() name: string = ''; 

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
     
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }
}
