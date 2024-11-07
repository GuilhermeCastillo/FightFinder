import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service'; 
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  completouCadastro: boolean = false;
  semFoto: boolean = true;
  mostraLista: boolean = false;
  respostaApi: any;
  imagemPerfilUrl: string | ArrayBuffer | null = null;

  pages = [
    { title: 'Home', link: '/home' },
    { title: 'Ranking', link: '/ranking' },
    { title: 'Match', link: '/match-luta' },
    { title: 'Treinar', link: '/match-treino' },
    { title: 'Sobre nós', link: '/sobre-nos' }
  ];

  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient) {}

  ngOnInit() {
    this.verificaSeCompletouCadastro();
  }

  isCurrentPage(link: string): boolean {
    return this.router.url === link;
  }

  abrirLista() {
    this.mostraLista = !this.mostraLista;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
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
            this.loadUserPhoto();
          }
        },
        error: (err) => {
          console.error('Erro ao enviar dados', err);
        }
    });
  }

  loadUserPhoto() {

    const url = "http://127.0.0.1:8000/api/v1/athlete/profile/"
    let token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(url, { headers } ).subscribe({
      next: (response) => {
        this.respostaApi = response;
        
        this.imagemPerfilUrl = `http://127.0.0.1:8000${this.respostaApi.imagem}`;
      },
      error: (err) => {
        console.error('Erro ao enviar dados', err);
      }
    });

  }

}
