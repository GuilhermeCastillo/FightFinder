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

  constructor(private title: Title, private http: HttpClient, private tokenService: TokenService, private fb: FormBuilder) { 

    this.form = this.fb.group({
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

  escolherFotoPerfil(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

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
 
  loadUserData() {
    // Simulando uma chamada de API que retorna os dados do perfil do usuário
    // const dadosUsuario = {
    //   nome: 'João da Silva',
    //   email: 'joao.silva@email.com',
    //   telefone: '11999999999',
    //   dataNascimento: '01/01/1990',
    //   endereco: 'Rua Exemplo, 123',
    //   cidade: 'São Paulo',
    //   estado: 'SP',
    //   cep: '12345-678',
    //   pais: 'Brasil',
    //   cpf: '123.456.789-00',
    //   rg: '12.345.678-9',
    //   estadoCivil: 'Solteiro',
    //   profissao: 'Desenvolvedor',
    //   nacionalidade: 'Brasileiro',
    //   dependentes: '2'
    // };
  
    // Preenche os campos com os dados do usuário
    // this.campos = [
    //   { value: dadosUsuario.nome, isEditable: false },
    //   { value: dadosUsuario.email, isEditable: false },
    //   { value: dadosUsuario.telefone, isEditable: false },
    //   { value: dadosUsuario.dataNascimento, isEditable: false },
    //   { value: dadosUsuario.endereco, isEditable: false },
    //   { value: dadosUsuario.cidade, isEditable: false },
    //   { value: dadosUsuario.estado, isEditable: false },
    //   { value: dadosUsuario.cep, isEditable: false },
    //   { value: dadosUsuario.pais, isEditable: false },
    //   { value: dadosUsuario.cpf, isEditable: false },
    //   { value: dadosUsuario.rg, isEditable: false },
    //   { value: dadosUsuario.estadoCivil, isEditable: false },
    //   { value: dadosUsuario.profissao, isEditable: false },
    //   { value: dadosUsuario.nacionalidade, isEditable: false },
    //   { value: dadosUsuario.dependentes, isEditable: false }
    // ];
  }

  atualizarDados() {
    const url = 'http://127.0.0.1:8000/api/v1/complete-athlete-profile/';
    
    let token = this.tokenService.getToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // ou 'Token ${token}' dependendo da sua API
    });

    this.pegaSiglaModalidade();
    let dataFormatada = this.formataData();
 
    const dados = {
      // photoUser: this.form.controls['fotoUser'].value,
      cpf: this.form.controls['cpf'].value,
      genero:  this.form.get('genero')?.value[0],
      peso: this.form.controls['peso'].value,
      altura: this.form.controls['altura'].value,
      telefone: this.form.controls['telefone'].value,
      cidade: this.form.controls['cidade'].value,
      estado: this.form.controls['estado'].value,
      pais: this.form.controls['pais'].value,
      data_nascimento: dataFormatada, // this.form.controls['dataNascimento'].value,
      nome: this.form.controls['nomeUser'].value,
      academia: this.form.controls['academia'].value,
      modalidade: this.siglaModalidade
    };

    console.log('DADOS ', dados);

    this.http.post<any>(url, dados, { headers }).subscribe({
      next: (response) => {
        this.respostaApi = response;   
        // this.tokenService.setToken(this.respostaApi['access']);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
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

  formataData(): string {
    var data = this.form.controls['dataNascimento'].value;
    let dia = data.substring(0,2);
    let mes = data.substring(3,5);
    let ano = data.substring(6,10);
    return ano + '-' + mes + '-' + dia;
  }
}