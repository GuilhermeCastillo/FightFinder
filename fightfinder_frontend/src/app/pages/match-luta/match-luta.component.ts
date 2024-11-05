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
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  carregarAdversarios = false;
  valorPadraoDropdown: string = 'Modalidade';
  dados: any;
  respostaApi: any;
  adversarioAtual: any;
  indiceAtual: number = 0;
  dadosPerfil: any;
  nomeModalidade: string = "";
  imagemPerfilUrl: string | ArrayBuffer | null = null;
  genero: any;
  completouCadastro: boolean = false;
  form: FormGroup;

  constructor(private http: HttpClient, private tokenService: TokenService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      photoUser: [''],
      nomeUser: [''], // apenas letras
      peso: [''],
      altura: [''],
      cidade: [''],
      estado: [''],
      pais: [''],
      dataNascimento: [''],
      modalidade: [''],
      genero: [['Gênero', 'Masculino', 'Feminino']],
      telefone: [''],
      academia: [''],
      idade: [''],
    });
  }

  ngOnInit() {
    this.verificaSeCompletouCadastro();
  }

  onOptionSelected(option: string) {
    this.modalidadeSelecionada = option;
    this.botaoDesabilitado = option === this.valorPadraoDropdown;
  }

  buscarAdversarios() {
    if (this.completouCadastro == false) {
      this.alertaCompletarCadastro();
      return;
    } 
    this.carregarAdversarios = true;

    const url = 'http://127.0.0.1:8000/api/v1/recommend/';
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.respostaApi = response;
        this.indiceAtual = 0;
        this.atualizarAdversarioAtual();
      },
      error: (err) => {
        console.error('Erro ao carregar adversários', err);
      },
    });
  }

  atualizarAdversarioAtual() {
    // Verifica se há mais recomendações a serem exibidas
    if (
      this.respostaApi.recommendations &&
      this.indiceAtual < this.respostaApi.recommendations.length
    ) {
      this.adversarioAtual = this.respostaApi.recommendations[this.indiceAtual];
    } else {
      this.adversarioAtual = null; // Não há mais adversários para exibir
    }
  }

  proximoAdversario() {
    this.indiceAtual++;
    this.atualizarAdversarioAtual();
  }

  adversarioAnterior() {
    this.indiceAtual--;
    this.atualizarAdversarioAtual();


  }

  verificaSeCompletouCadastro() {
    const url = "http://127.0.0.1:8000/api/v1/athlete-profile-status/"
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
        next: (response) => {
          this.respostaApi = response;
          this.completouCadastro = this.respostaApi['athlete_profile_complete']
          
          if (this.completouCadastro) {
            this.loadUserData();
          }
        },
        error: (err) => {
          console.error('Erro ao enviar dados', err);
        }
    });
  }

  loadUserData() {
    const url = "http://127.0.0.1:8000/api/v1/athlete/profile/"
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
      next: (response) => {
        this.dadosPerfil = response;
        this.genero = this.generoPorExtenso(this.dadosPerfil.genero);
        this.nomeModalidade = this.pegaNomeModalidadePorSigla(this.dadosPerfil.modalidade);
        this.imagemPerfilUrl = `http://127.0.0.1:8000${this.dadosPerfil.imagem}`;

        const dadosUser = {
          nomeUser: this.dadosPerfil.nome,
          peso: this.dadosPerfil.peso,
          altura: this.dadosPerfil.altura,
          cidade: this.dadosPerfil.cidade,
          estado: this.dadosPerfil.estado,
          pais: this.dadosPerfil.pais,
          dataNascimento: this.formataDataBR(this.dadosPerfil.data_nascimento),
          modalidade: this.pegaNomeModalidadePorSigla(this.dadosPerfil.modalidade),
          genero: this.generoPorExtenso(this.dadosPerfil.genero),
        };
        var dataNascimentoDATE = this.converterParaData(dadosUser.dataNascimento);
        this.form.get('idade')?.setValue(this.calcularIdade(new Date(dataNascimentoDATE)));
        this.form.patchValue(dadosUser);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  pegaNomeModalidadePorSigla(sigla: string): string {
    switch(sigla) {
      case "BJJ": this.nomeModalidade = 'Brazilian Jiu-Jitsu'; break;
      case "MMA" : this.nomeModalidade ='Mixed Martial Arts'; break;
      case "BOX": this.nomeModalidade = 'Boxing'; break;
      case "MT" : this.nomeModalidade = 'Muay Thai'; break;
      case "JUDO": this.nomeModalidade = 'Judo'; break;
      case "WREST": this.nomeModalidade = 'Wrestling'; break;
      case "KARATE": this.nomeModalidade = 'Karate'; break;
      case "TKD": this.nomeModalidade = 'Taekwondo'; break;
      case "INI": this.nomeModalidade = 'Iniciante'; break;
      default: this.nomeModalidade = "Nenhuma"; break;
    }
    return this.nomeModalidade;
  }

  generoPorExtenso(genero: string): string {
    if (genero === "m" || genero === "M") {
      genero = "Masculino";
      return genero;
    }
    genero = "Feminino";
    return genero; 
  }

  formataDataBR(dataUSA: string): string { 
    let ano = dataUSA.substring(0,4);
    let mes = dataUSA.substring(5,7);
    let dia = dataUSA.substring(8,10);
    return dia + '/' + mes + '/' + ano;
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  converterParaData(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  alertaCompletarCadastro() {
    Swal.fire({
      title: 'Dica',
      text: 'Complete seu cadastro na página de Perfil para utilizar todas funcionalidades',
      icon: 'info', 
      confirmButtonText: 'Ok'}).then((result) => {
        if (result.isConfirmed) { 
          this.router.navigate(['/perfil']);
        } 
    }); 
  }
}
