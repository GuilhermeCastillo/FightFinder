import { Component, forwardRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { TokenService } from '../../services/token/token.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, InputSenhaComponent, InputTextoComponent, InputRadioComponent,
    ButtonComponent, BotaoPequenoComponent, DropdownComponent, FormsModule, ReactiveFormsModule, HttpClientModule, NgxMaskDirective],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
  providers: [
    provideNgxMask(),
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PerfilComponent),
    multi: true
  }]
})

export class PerfilComponent {
  semFoto: boolean = false;
  campoBloqueado: boolean = true;
  imageUrl: string | ArrayBuffer | null = null;
  respostaApi: any;
  form: FormGroup;
  siglaModalidade: string = "";
  nomeModalidade: string = "";
  dadosPerfil: any;
  genero: any;
  selectedFile: any;
  imagemPerfilUrl: string | null = null;
  completouCadastro: boolean = false;

  constructor(private title: Title, private http: HttpClient, private tokenService: TokenService, private fb: FormBuilder) { 

    this.form = this.fb.group({
      photoUser: [''],
      nomeUser: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]], // apenas letras
      cpf: ['', [Validators.required, Validators.maxLength(11)]],
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      modalidade: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
      academia: ['', Validators.required],
    }); 
  }

  ngOnInit() {
    this.verificaSeCompletouCadastro(); 
  }

  escolherFotoPerfil(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.selectedFile = fileInput.files[0];;

      const maxSizeInMB = 5; // Limite de tamanho em MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        alert(`O arquivo é muito grande. O tamanho máximo permitido é ${maxSizeInMB} MB.`);
        fileInput.value = ''; // Limpa o input
        return;
      } else { // Continue com o processamento do arquivo
        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl = reader.result;
        };

        reader.readAsDataURL(file); 
      } 
    }
  }

  onOptionSelected(option: string) {
    console.log('Opção selecionada:', option); 
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

        console.log('Dados do usuário: ', this.dadosPerfil);
        this.genero = this.generoPorExtenso(this.dadosPerfil.genero);
        this.nomeModalidade = this.pegaNomeModalidadePorSigla(this.dadosPerfil.modalidade);
        this.imagemPerfilUrl = this.dadosPerfil.imagem;

        const dadosUser = {
          // photoUser: this.dadosPerfil.imagem,
          nomeUser: this.dadosPerfil.nome,
          cpf: this.dadosPerfil.cpf,
          peso: this.dadosPerfil.peso,
          altura: this.dadosPerfil.altura,
          cidade: this.dadosPerfil.cidade,
          estado: this.dadosPerfil.estado,
          pais: this.dadosPerfil.pais,
          dataNascimento: this.formataDataBR(this.dadosPerfil.data_nascimento),
          modalidade: this.pegaNomeModalidadePorSigla(this.dadosPerfil.modalidade),
          genero: this.generoPorExtenso(this.dadosPerfil.genero),
          telefone: this.dadosPerfil.telefone,
          academia: this.dadosPerfil.academia,
        };  
        this.form.patchValue(dadosUser);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  atualizarDados() {
    const url = 'http://127.0.0.1:8000/api/v1/complete-athlete-profile/';
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // ou 'Token ${token}' dependendo da sua API
    });

    this.pegaSiglaModalidade();
    let dataFormatada = this.formataDataUSA();
    
    const formData = new FormData();

    const dados = {
     // imagem: this.form.controls['photoUser'].value,
      cpf: this.form.controls['cpf'].value,
      genero:  this.form.get('genero')?.value[0],
      peso: this.form.controls['peso'].value,
      altura: this.form.controls['altura'].value,
      telefone: this.form.controls['telefone'].value,
      cidade: this.form.controls['cidade'].value,
      estado: this.form.controls['estado'].value,
      pais: this.form.controls['pais'].value,
      data_nascimento: dataFormatada,
      nome: this.form.controls['nomeUser'].value,
      academia: this.form.controls['academia'].value,
      modalidade: this.siglaModalidade
    };


    Object.entries(dados).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
  
    // Adicione o arquivo de imagem, se houver
    // this.selectedFile.name = this.getNomeOriginal(this.selectedFile.name);


    // console.log('DADOS ', this.selectedFile.name);

    if (this.selectedFile) {
      console.log('ENTREI NO IF');
      formData.append('imagem', this.selectedFile, this.selectedFile.name);
    }

    console.log('DADOS ', formData);

    this.http.post<any>(url, formData, { headers }).subscribe({
      next: (response) => {
        this.respostaApi = response;
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  getNomeOriginal(nomeComSujeira: string): string {
    // Usando regex para remover a parte "sujeira" do nome
    const nomeOriginal = nomeComSujeira.replace(/(-[a-z0-9]+)?(\.[a-z]{3,4})?$/, '');
    return nomeOriginal;
}

  pegaSiglaModalidade() {
    switch(this.form.get('modalidade')?.value) {
      case 'Brazilian Jiu-Jitsu': this.siglaModalidade = "BJJ"; break;
      case 'Mixed Martial Arts': this.siglaModalidade = "MMA"; break;
      case 'Boxing': this.siglaModalidade = "BOX"; break;
      case 'Muay Thai': this.siglaModalidade = "MT"; break;
      case 'Judo': this.siglaModalidade = "JUDO"; break;
      case 'Wrestling': this.siglaModalidade = "WREST"; break;
      case 'Karate': this.siglaModalidade = "KARATE"; break;
      case 'Taekwondo': this.siglaModalidade = "TKD"; break;
      case 'Iniciante': this.siglaModalidade = "INI"; break;
      default: this.siglaModalidade = "Nenhuma"; break;
    }
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

  formataDataUSA(): string {
    var data = this.form.controls['dataNascimento'].value;
    let dia = data.substring(0,2);
    let mes = data.substring(3,5);
    let ano = data.substring(6,10);
    return ano + '-' + mes + '-' + dia;
  }

  formataDataBR(dataUSA: string): string { 
    let ano = dataUSA.substring(0,4);
    let mes = dataUSA.substring(5,7);
    let dia = dataUSA.substring(8,10);
    return dia + '/' + mes + '/' + ano;
  }

  generoPorExtenso(genero: string): string {
    if (genero === "m" || genero === "M") {
      genero = "Masculino";
      return genero;
    }
    genero = "Feminino";
    return genero; 
  }
}