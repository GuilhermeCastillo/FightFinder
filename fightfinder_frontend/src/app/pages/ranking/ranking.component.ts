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

  constructor(private title: Title) { } 
  
  columns = [
    { header: 'Rank', field: 'Rank' },
    { header: 'Nome', field: 'Nome' }, 
    { header: 'Peso (Kg)', field: 'Peso' },
    { header: 'Modalidade', field: 'Modalidade' },
    { header: 'Vitórias', field: 'Vitorias' }  // ou lutas e treinos
  ]; 

  ngOnInit(): void {
    this.title.setTitle('Ranking')
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend(): void {
    // Simulação de dados recebidos do backend
    this.data = [ 
    ];
  }

  buscarLutadores(): void { 
    this.validaFiltros();
  }

  validaFiltros(): void {
    // if (dropdown.value === valorPadraoSelect) {}
    //  this.erroMsg = true; 
    //   this.erro = true; 
  

    // if (ok) {  
      this.buscarDadosFiltrados(); 
    // }
 
  }

  buscarDadosFiltrados() { 
    this.loading = true;

    setTimeout(() => {
      this.loading = false; 
    }, 1000); 
  }

  onOptionSelected(option: string) {
  }

}
