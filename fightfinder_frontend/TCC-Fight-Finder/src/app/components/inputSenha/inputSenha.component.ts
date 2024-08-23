import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-senha',
  standalone: true,
  imports: [],
  templateUrl: './InputSenha.component.html',
  styleUrl: './InputSenha.component.css'
})
export class InputSenhaComponent {

  @Input() type: string = 'password'; // Tipo de input (text, checkbox, password, etc.)
  @Input() placeholder: string = ''; // Placeholder para o input 
  @Input() disabled: boolean = false; // Define se o input está desabilitado

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
     
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }

}
