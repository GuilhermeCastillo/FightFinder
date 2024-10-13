import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-botao-pequeno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-pequeno.component.html',
  styleUrl: './botao-pequeno.component.css'
})
export class BotaoPequenoComponent {
  @Input() textoBtn: string = '';   
  @Input() backgroundColor: string = 'var(--azul)';
  @Input() isEditable: boolean = false;
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  ngOnInit(): void {
     
  }

  onInputChange(event: Event) {
    const inputElement = (event.target as HTMLInputElement).value;
    this.valueChange.emit(inputElement);
  }

  ativarDesativar(id: boolean): void {
    if(id == true) {
      id = false;
      return;
    }
    id = true;
  }
}
