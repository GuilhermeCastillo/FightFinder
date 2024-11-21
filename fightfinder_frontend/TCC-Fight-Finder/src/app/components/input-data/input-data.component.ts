import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-data',
  standalone: true,
  imports: [],
  templateUrl: './input-data.component.html',
  styleUrl: './input-data.component.css'
})
export class InputDataComponent {
  @Input() type: string = 'date';  

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
     
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }
}
