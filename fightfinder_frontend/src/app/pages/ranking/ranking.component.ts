import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component'; 
import { LoadingCircleComponent } from '../../components/loading-circle/loading-circle.component';
import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, InputTextoComponent, ButtonComponent, DropdownComponent, TableComponent, LoadingCircleComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})

export class RankingComponent implements OnInit { 
  data: [] = []; 
  valorPadraoSelect: string = 'Modalidade';
  erroMsg: boolean = false;
  loading: boolean = false;
  dados: any;
  
  constructor(private title: Title, private tokenService: TokenService, private http: HttpClient) { } 
  
  columns = [
    { header: 'Nome', field: 'athlete' }, 
    { header: 'Peso (Kg)', field: 'peso' },
    { header: 'Altura (m)', field: 'altura' },
    { header: 'Modalidade', field: 'modalidade' },
    { header: 'Matchs', field: 'total_connections' }
  ];

  ngOnInit(): void {
    this.title.setTitle('Ranking');
    this.buscarDadosRank();

    this.dados = this.data.map((item: IAtleta, index) => ({
      ...item, index
    }));
  }

  buscarDadosFiltrados() { 
    this.loading = true;

    setTimeout(() => {
      this.loading = false; 
    }, 1000); 
  }

  onOptionSelected(option: string) {
  }

  buscarDadosRank(): void {
    const url: string = "http://127.0.0.1:8000/api/v1/ranking/";
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
      next: (response) => {
        this.dados = response;
      },
      error: (err) => {
        console.error('Erro ao buscar dados', err);
      }
    });
  }
}

export interface IAtleta {
  athlete: string;
  peso: number;
  modalidade: string;
  altura: number;
  total_connections: number;
}