import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {
  @Input() options: string[] = []; // Lista de opções recebida como entrada  
  @Input() selectedOption: string | null = null; // Opção selecionada
  @Input() disabled: boolean = false;
  @Output() optionSelected = new EventEmitter<string>(); // Evento para emitir a opção selecionada
   

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value ?? null;
  
    if (value) {
      this.selectedOption = value;
      this.optionSelected.emit(value);
    }
  }

  
}
