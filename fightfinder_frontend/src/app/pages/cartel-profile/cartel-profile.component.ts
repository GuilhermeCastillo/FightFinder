import { Component, forwardRef } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cartel-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './cartel-profile.component.html',
  styleUrl: './cartel-profile.component.css',
  providers:[ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CartelProfileComponent),
    multi: true
  }]
})

export class CartelProfileComponent {
  dadosPerfil: any;
  respostaApi: any;
  completouCadastro: boolean = false;
  form: FormGroup;
  idade: any;

  constructor(private http: HttpClient, private tokenService: TokenService, private fb: FormBuilder) {

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
      idade: ['', Validators.required],
    }); 
  }

  ngOnInit() {
    this.verificaSeCompletouCadastro();
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

        const dadosUser = {
          nomeUser: this.dadosPerfil.nome,
          cpf: this.formatarCpf(this.dadosPerfil.cpf),
          peso: this.dadosPerfil.peso,
          altura: this.dadosPerfil.altura,
          cidade: this.dadosPerfil.cidade,
          estado: this.dadosPerfil.estado,
          pais: this.dadosPerfil.pais,
          dataNascimento: this.formataDataBR(this.dadosPerfil.data_nascimento),
          modalidade: this.dadosPerfil.modalidade,
          genero: this.generoPorExtenso(this.dadosPerfil.genero),
          telefone: this.formatarTelefone(this.dadosPerfil.telefone),
          academia: this.dadosPerfil.academia,
        };
        this.form.patchValue(dadosUser);
        var dataNascimentoDATE = this.converterParaData(dadosUser.dataNascimento);
        this.form.get('idade')?.setValue(this.calcularIdade(new Date(dataNascimentoDATE)));
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  formatarCpf(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
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

  converterParaData(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia); // (Janeiro = 0)
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

}
