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
  semFoto: boolean = false; 

  onOptionSelected(option: string) {
    console.log("ASHJKFDGSDJKFHD!!! ", option);
    if (option != "Modalidade") {
      this.modalidadeSelecionada = true;
    } else {
      this.modalidadeSelecionada = false;
    }
  }
  
}
