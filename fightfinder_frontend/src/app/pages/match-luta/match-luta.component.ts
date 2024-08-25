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
  modalidadeSelecionada: boolean = false;
  botaoDesabilitado: boolean = true;
  semFoto: boolean = false;
  valorPadrao: string = 'Modalidade';

  onOptionSelected(option: string) {  
    console.log('Opção: ', option);
    if (option != this.valorPadrao) {
      this.botaoDesabilitado = true;
    } else {
      this.botaoDesabilitado = false;
    }
  }

  buscarAdversarios() {
    if (this.modalidadeSelecionada == true) {
      this.modalidadeSelecionada = false;
    } else { 
      this.modalidadeSelecionada = true;
    }
  }
  
}
