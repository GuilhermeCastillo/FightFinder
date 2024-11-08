import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http'; 
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ButtonComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  retorno: any;
  completouCadastro: boolean = false;

  constructor(private title: Title, private router: Router, private http: HttpClient, private tokenService: TokenService) {  }

  ngOnInit(): void {
    this.title.setTitle('Home'); 
    this.verificaSeCompletouCadastro();
  }

  verificaSeCompletouCadastro() {
    const url = "http://127.0.0.1:8000/api/v1/athlete-profile-status/"; 
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers }).subscribe({
      next: (response) => {
        this.retorno = response;
        this.completouCadastro = this.retorno['athlete_profile_complete'];
        console.log('Completou cadastro?', this.completouCadastro);
        if (!this.completouCadastro) {
          this.alertaCompletarCadastro();
        }
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });
  }

  alertaCompletarCadastro() {
    Swal.fire({
      title: 'Dica',
      text: 'Complete seu cadastro na página de Perfil para acessar todas funcionalidades',
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

