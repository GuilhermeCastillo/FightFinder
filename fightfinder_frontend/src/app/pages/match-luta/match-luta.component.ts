import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { CommonModule } from '@angular/common'; 
import { LoadingCircleComponent } from '../../components/loading-circle/loading-circle.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-match-luta',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DropdownComponent, ButtonComponent, BotaoPequenoComponent, CommonModule, LoadingCircleComponent,
    HttpClientModule
  ],
  templateUrl: './match-luta.component.html',
  styleUrl: './match-luta.component.css'
})
export class MatchLutaComponent {
  modalidadeSelecionada: string = 'option';
  botaoDesabilitado: boolean = true;
  semFoto: boolean = false;
  carregarAdversarios = false;
  valorPadraoDropdown: string = 'Modalidade';
  dados: any;

  constructor(private http: HttpClient) {  }

  onOptionSelected(option: string) {  
    // limpar ou sobreescrever valores do adversário ao chamar a função 
    this.modalidadeSelecionada = option;
    if (option != this.valorPadraoDropdown) {
      this.botaoDesabilitado = false; 
      return;
    }
    this.botaoDesabilitado = true;
  }

  buscarAdversarios() { 
    // não trazer nada
    if (this.modalidadeSelecionada == this.valorPadraoDropdown) { 
      this.carregarAdversarios = false;
      return;
    } 
    //buscar adversários
    let carregando = document.querySelector('botoes')?.textContent;
    this.carregarAdversarios = true;
 
    this.getDados().subscribe({
      next: (response) => {
        this.dados = response; // Processa a resposta
        console.log(this.dados);
      },
      error: (err) => {
        console.error('Erro ao obter dados', err); // Lida com erros
      }
    }); 
  } 
  
  getDados(): Observable<any> {
    const apiUrl = 'https://api.exemplo.com/endpoint'; // URL da API
    return this.http.get<any>(apiUrl);
  }

} 

