import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css'
})
export class InputRadioComponent {
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
