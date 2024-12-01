import { Component, forwardRef } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputSenhaComponent } from '../../components/input-senha/inputSenha.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'; 
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TokenService } from '../../services/token/token.service'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ButtonComponent, InputTextoComponent, InputSenhaComponent, InputRadioComponent, ReactiveFormsModule, DropdownComponent,
     NgxMaskDirective, DatepickerComponent, FormsModule, CommonModule, CheckboxComponent, HttpClientModule],
  providers: [ 
      provideNgxMask({
        validation: false,
      }), 
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CadastroComponent),
      multi: true
    }
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  erroRadio: boolean = false; 
  erroNomeUser: boolean = false;
  erroEmail: boolean = false;
  erroSenha1: boolean = false; 
  erroSenha2: boolean = false; 
  erroSenhasDiferentes: boolean = false; 
  erroTermo1: boolean = false; 
  erroTermo2: boolean = false;  
  nomeJaExiste: boolean = false;
  textoNomeJaExistente: string = "Um usuário com este nome de usuário já existe.";
  form: FormGroup;
  respostaApi: any;
  selectedDate: string = '';

  constructor(private router: Router, private title: Title, private fb: FormBuilder, private http: HttpClient,
    private tokenService: TokenService) { 
    this.form = this.fb.group({
      // radio: ['', Validators.required],
      nomeUser: ['', [Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')]], // apenas letras   
      email: ['', [Validators.required, Validators.email]],
      senha1: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]],
      senha2: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]*$')]],
      termo1: ['', Validators.required],
      termo2: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.title.setTitle('Cadastro');
  }
  
  onSubmit() { 
    this.nomeJaExiste = false;
    if (this.form.valid 
      && this.form.controls['senha1'].value === this.form.controls['senha2'].value
      && this.form.controls['termo1'].value == true 
      && this.form.controls['termo2'].value == true) { 

        this.erroRadio = false;
        this.erroEmail = false;
        this.erroSenha1 = false;
        this.erroSenha2 = false;
        this.erroSenhasDiferentes = false;  

        this.enviarDadosCadastro();

    } else {
      this.form.controls['nomeUser'].invalid ? this.erroNomeUser = true : this.erroNomeUser = false;
      this.form.controls['email'].invalid ? this.erroEmail = true : this.erroEmail = false;
      this.form.controls['senha1'].invalid ? this.erroSenha1 = true : this.erroSenha1 = false;
      this.form.controls['senha2'].invalid ? this.erroSenha2 = true : this.erroSenha2 = false;
      this.form.controls['senha1'].value !== this.form.controls['senha2'].value ? this.erroSenhasDiferentes = true : this.erroSenhasDiferentes = false;
      this.form.controls['termo1'].invalid ? this.erroTermo1 = true : this.erroTermo1 = false; // não dá p confiar nisso aq nao
      this.form.controls['termo2'].invalid ? this.erroTermo2 = true : this.erroTermo2 = false; // não dá p confiar nisso aq nao
    }
  }

  enviarDadosCadastro(): void {
    const dados = {
      username: this.form.controls['nomeUser'].value,
      password: this.form.controls['senha1'].value,
      password2: this.form.controls['senha2'].value,
      email: this.form.controls['email'].value
    };

    const url: string = "http://127.0.0.1:8000/api/v1/register/";
    this.http.post<any>(url, dados).subscribe({
      next: (response) => {
        this.respostaApi = response;
        this.tokenService.setToken(this.respostaApi['access']);
        this.router.navigate(['/home']); 
      },
      error: (err) => {
        err.error.username[0] === this.textoNomeJaExistente ? this.nomeJaExiste = true : this.nomeJaExiste = false;
      }
    });
  }

  mostrarLGPD() {
    Swal.fire({
      title: 'Consentimento para Tratamento de Dados Pessoais',
      html: `
        <p>Ao prosseguir com o cadastro, você concorda com a nossa Política de Privacidade
        e consente com o tratamento dos seus dados pessoais, incluindo nome, e-mail, e outras informações fornecidas, para fins de cadastro, comunicação e acesso aos serviços oferecidos em nossa plataforma.</p>
        <p>Seus dados serão armazenados de forma segura e utilizados apenas para os fins descritos. Você pode revogar este consentimento ou exercer seus direitos como titular de dados a qualquer momento, conforme previsto na LGPD.</p>
      `,
      icon: 'info',
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: 'Ok',
    });
  }
}
