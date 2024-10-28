import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { CommonModule } from '@angular/common';
import { LoadingCircleComponent } from '../../components/loading-circle/loading-circle.component';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { url } from 'inspector';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-match-luta',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    DropdownComponent,
    ButtonComponent,
    BotaoPequenoComponent,
    CommonModule,
    LoadingCircleComponent,
    HttpClientModule,
  ],
  templateUrl: './match-luta.component.html',
  styleUrl: './match-luta.component.css',
})
export class MatchLutaComponent {
  modalidadeSelecionada: string = 'option';
  botaoDesabilitado: boolean = true;
  semFoto: boolean = false;
  carregarAdversarios = false;
  valorPadraoDropdown: string = 'Modalidade';
  dados: any;
  respostaApi: any;
  adversarioAtual: any;
  indiceAtual: number = 0;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  onOptionSelected(option: string) {  
      this.modalidadeSelecionada = option;
      this.botaoDesabilitado = option === this.valorPadraoDropdown;
  }

  buscarAdversarios() { 
      this.carregarAdversarios = true;
  
      const url = 'http://127.0.0.1:8000/api/v1/recommend/';
      let token = this.tokenService.getToken();

      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });

      this.http.get<any>(url, { headers }).subscribe({
          next: (response) => {
              this.respostaApi = response;
              this.indiceAtual = 0;
              this.atualizarAdversarioAtual();
          },
          error: (err) => {
              console.error('Erro ao carregar adversários', err);
          }
      });
  }

  atualizarAdversarioAtual() {
      // Verifica se há mais recomendações a serem exibidas
      if (this.respostaApi.recommendations && this.indiceAtual < this.respostaApi.recommendations.length) {
          this.adversarioAtual = this.respostaApi.recommendations[this.indiceAtual];
      } else {
          this.adversarioAtual = null; // Não há mais adversários para exibir
      }
  }

  proximoAdversario() {
      this.indiceAtual++;
      this.atualizarAdversarioAtual();
  }
}
