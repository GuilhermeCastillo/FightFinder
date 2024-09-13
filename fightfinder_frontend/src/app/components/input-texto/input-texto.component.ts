import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input-texto',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective],
  providers: [
    provideNgxMask({
      validation: false,  // Ou outras configurações que você quiser
    }),
  ],
  templateUrl: './input-texto.component.html',
  styleUrl: './input-texto.component.css'
})
export class InputTextoComponent {

  @Input() type: string = 'text'; // Tipo de input (text, checkbox, password, etc.)
  @Input() inputText: string = '';  
  @Input() placeholder: string = ''; // Placeholder para o input 
  @Input() disabled: boolean = false; // Define se o input está desabilitado
  @Input() id: string = '';
  @Input() borderColor: string = 'var(--vermelho)';
  @Input() maxLength: number = 60;
  @Input() width: string = '18rem';

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void { 
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }

}
