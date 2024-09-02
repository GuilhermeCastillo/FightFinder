import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, InputTextoComponent, ButtonComponent, DropdownComponent, LoadingComponent, TableComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})

export class RankingComponent implements OnInit {

  data: [] = [];

  constructor() { 
    let data: { Rank: string; nome: string; Idade: number; Modalidade: string; Vitorias: number; }[];
  } 
  
  columns = [
    { header: 'Rank', field: 'Rank' },
    { header: 'Nome', field: 'Nome' },
    { header: 'Idade', field: 'Idade' },
    { header: 'Peso (Kg)', field: 'Peso' },
    { header: 'Modalidade', field: 'Modalidade' },
    { header: 'Vitorias', field: 'Vitorias' } 
  ]; 

  ngOnInit(): void { 
    this.fetchDataFromBackend();
  }

  fetchDataFromBackend(): void {
    // Simulação de dados recebidos do backend
    this.data = [ 
    ];
  }

  valorPadraoSelect: string = 'Modalidade';
  erroMsg: boolean = false;
  loading: boolean = false;

  buscarLutadores(): void { 
    this.validaFiltros();
  }

  validaFiltros(): void {
    // if (dropdown.value === valorPadraoSelect) {}
    this.erroMsg = true;
    
  //   this.erro = true; 
  //   setTimeout(() => {
  //     console.log('3 SEGUNDOS!');
  //   }, 3000);
  //  this.erro = false;
    
  }

  onOptionSelected(option: string) {
    console.log('Opção selecionada:', option); 
  }

}
