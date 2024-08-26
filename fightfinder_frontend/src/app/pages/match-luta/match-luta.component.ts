import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-match-luta',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DropdownComponent, ButtonComponent, BotaoPequenoComponent, CommonModule],
  templateUrl: './match-luta.component.html',
  styleUrl: './match-luta.component.css'
})
export class MatchLutaComponent {
  modalidadeSelecionada: string = 'option';
  botaoDesabilitado: boolean = true;
  semFoto: boolean = false;
  carregarAdversarios = false;
  valorPadraoDropdown: string = 'Modalidade';

  onOptionSelected(option: string) {  
    // limpar ou sobreescrever valores do adversário ao chamar a função

    console.log('option', option); 
    this.modalidadeSelecionada = option;
    if (option != this.valorPadraoDropdown) {
      this.botaoDesabilitado = false; 
    } else {
      this.botaoDesabilitado = true;  
    }
 
  }

  buscarAdversarios() { 
    if (this.modalidadeSelecionada == this.valorPadraoDropdown) {
      let carregando = document.querySelector('botoes')?.textContent;
        

      this.carregarAdversarios = false;
    } else {
      this.carregarAdversarios = true;
    }
  } 
  
} 

