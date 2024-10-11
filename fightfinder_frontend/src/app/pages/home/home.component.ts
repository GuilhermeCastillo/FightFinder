import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  retorno!: boolean;

  constructor(private title: Title, private router: Router, private http: HttpClient) {  }

  ngOnInit(): void {
    this.title.setTitle('Home'); 

    // this.verificaSeCompletouCadastro();
  }

  verificaSeCompletouCadastro() {
    const url = "http://127.0.0.1:8000/api/v1/athlete-profile-status/"; 

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.retorno = response; // Processa a resposta da API
        console.log(this.retorno); 
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err); // Lida com erros
      }
    });
    console.log('completou cadastro? ', this.retorno);
    this.retorno ? this.alertaCadastroPreenchido() : this.alertaCompletarCadastro();
  }

  alertaCompletarCadastro() {
    Swal.fire({
      title: 'Dica',
      text: 'Para usar as funcionalidades é preciso completar o cadastro em seu Perfil.',
      icon: 'info', 
      confirmButtonText: 'Ok'}).then((result) => {
        if (result.isConfirmed) { 
          this.router.navigate(['/perfil']);
        } 
    }); 
  }

  alertaCadastroPreenchido() {
    Swal.fire({
      title: 'Parabéns!',
      text: 'Seu Cadastro está completo e agora você pode utilizar todo sistema',
      icon: 'success',
      confirmButtonText: 'OK'
    });
     
    this.router.navigate(['/perfil']); 
  }
}

