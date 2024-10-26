import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { CommonModule } from '@angular/common'; 
import { LoadingCircleComponent } from '../../components/loading-circle/loading-circle.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { url } from 'inspector';
import { TokenService } from '../../services/token/token.service';

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
  respostaApi: any;

  constructor(private http: HttpClient, private tokenService: TokenService) {  }

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
    // if (this.modalidadeSelecionada == this.valorPadraoDropdown) { 
    //   this.carregarAdversarios = false;
    //   return;
    // } 
    this.carregarAdversarios = true;
 
    const url = 'http://127.0.0.1:8000/api/v1/recommend/';
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // ou 'Token ${token}' dependendo da sua API
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.respostaApi = response;
        console.log("RETORNO", this.respostaApi);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

} 

