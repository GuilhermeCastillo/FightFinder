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
import Swal from 'sweetalert2';

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
  selectedFile: File | null = null;
  imagemPerfilUrl: string | ArrayBuffer | null = null;
  completouCadastro: boolean = false;
  erroNome: boolean = false; 
  erroCpf: boolean = false;
  erroGenero: boolean = false;
  erroData: boolean = false; 
  erroPeso: boolean = false; 
  erroAltura: boolean = false; 
  erroTelefone: boolean = false; 
  erroModalidade: boolean = false; 
  erroPais: boolean = false; 
  erroEstado: boolean = false; 
  erroCidade: boolean = false;  

  constructor(private title: Title, private http: HttpClient, private tokenService: TokenService, private fb: FormBuilder) { 

    this.form = this.fb.group({
      photoUser: [''],
      nomeUser: ['', [Validators.required, Validators.maxLength(50)]], // apenas letras
      cpf: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      peso: ['', Validators.required],
      altura: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      modalidade: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
      academia: [''],
    });
  }

  ngOnInit() {
    this.title.setTitle('Perfil');
    this.verificaSeCompletouCadastro();
  }

  escolherFotoPerfil(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
  
      const maxSizeInMB = 5; // Limite de tamanho em MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  
      if (this.selectedFile.size > maxSizeInBytes) {
        alert(`O arquivo é muito grande. O tamanho máximo permitido é ${maxSizeInMB} MB.`);
        
        // Limpa o input e o selectedFile
        this.selectedFile = null; 
        fileInput.value = '';
        fileInput.parentNode?.replaceChild(fileInput.cloneNode(true), fileInput);
        return;

      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagemPerfilUrl = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
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
          cpf: this.formatarCpf(this.dadosPerfil.cpf),
          peso: this.dadosPerfil.peso,
          altura: this.dadosPerfil.altura,
          cidade: this.dadosPerfil.cidade,
          estado: this.dadosPerfil.estado,
          pais: this.dadosPerfil.pais,
          dataNascimento: this.formataDataBR(this.dadosPerfil.data_nascimento),
          modalidade: this.pegaNomeModalidadePorSigla(this.dadosPerfil.modalidade),
          genero: this.generoPorExtenso(this.dadosPerfil.genero),
          telefone: this.formatarTelefone(this.dadosPerfil.telefone),
          academia: this.dadosPerfil.academia,
        };
        this.form.patchValue(dadosUser);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  validaForm() {
    if (this.form.valid) { 
      this.atualizarDados();
    } else {
      this.form.controls['nomeUser'].invalid ? this.erroNome = true : this.erroNome = false;
      this.form.controls['cpf'].invalid ? this.erroCpf = true : this.erroCpf = false;
      this.form.controls['dataNascimento'].invalid ? this.erroData = true : this.erroData = false;
      this.form.controls['peso'].invalid ? this.erroPeso = true : this.erroPeso = false;
      this.form.controls['altura'].invalid ? this.erroAltura = true : this.erroAltura = false;
      this.form.controls['telefone'].invalid ? this.erroTelefone = true : this.erroTelefone = false;
      this.form.controls['pais'].invalid ? this.erroPais = true : this.erroPais = false;
      this.form.controls['estado'].invalid ? this.erroEstado = true : this.erroEstado = false;
      this.form.controls['cidade'].invalid ? this.erroCidade = true : this.erroCidade = false;
    }
  }

  atualizarDados() {
    const url = 'http://127.0.0.1:8000/api/v1/complete-athlete-profile/';
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.pegaSiglaModalidade();
    let dataFormatada = this.formataDataUSA();
    const formData = new FormData();
    
    const dados = {
      cpf: this.removerMascara(this.form.controls['cpf'].value),
      genero:  this.form.get('genero')?.value[0],
      peso: this.form.controls['peso'].value,
      altura: this.form.controls['altura'].value,
      telefone: this.removerMascara(this.form.controls['telefone'].value),
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
  
    if (this.selectedFile) {
      formData.append('imagem', this.selectedFile, this.selectedFile.name);
    }

    this.http.post<any>(url, formData, { headers }).subscribe({
      next: (response) => {
        this.respostaApi = response;
        this.modalDadosSalvosSucesso();
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
        err.error.genero == '"G" não é um escolha válido.' ? this.erroGenero = true : this.erroGenero = false;
        err.error.modalidade == "\"Nenhuma\" não é um escolha válido." ? this.erroModalidade = true : this.erroModalidade = false;
      }
    });
  }

  limparDados() {
    this.genero = "Gênero";
    this.nomeModalidade = "Modalidade";

    const dadosUser = {
      nomeUser: "",
      cpf: "",
      peso: "",
      altura: "",
      cidade: "",
      estado: "",
      pais: "",
      dataNascimento: "",
      modalidade: "Modalidade",
      genero: "Gênero",
      telefone: "",
      academia: "",
    };
    this.form.patchValue(dadosUser);
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

  removerMascara(valor: string): string {
    return valor.replace(/\D/g, ''); // Remove qualquer caractere não numérico
  }

  formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  modalDadosSalvosSucesso() {
    Swal.fire({
      title: 'Dados salvos',
      text: 'Seu dados foram atualizados com sucesso!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}