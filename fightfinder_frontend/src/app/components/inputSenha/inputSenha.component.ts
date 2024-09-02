import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-senha',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './InputSenha.component.html',
  styleUrl: './InputSenha.component.css'
})
export class InputSenhaComponent {
  @Input() password: string = '';
  @Input() type: string = 'password'; // Tipo de input (text, checkbox, password, etc.)
  @Input() placeholder: string = ''; // Placeholder para o input 
  @Input() disabled: boolean = false; // Define se o input está desabilitado
  @Output() valueChange = new EventEmitter<string>();

  passwordVisible: boolean = false;

  ngOnInit(): void {
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  
}
