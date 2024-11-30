import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service'; 
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { UserPhotoService } from '../../services/UserPhoto/userPhotoService.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  completouCadastro: boolean = false;
  semFoto: boolean = true;
  mostraLista: boolean = false;
  respostaApi: any;
  photoUrl: string | null = null;

  pages = [
    { title: 'Ranking', link: '/ranking' },
    { title: 'Cartel', link: '/cartel-profile' },
    { title: 'Match', link: '/match-luta' },
    { title: 'Perfil', link: '/perfil' },
    { title: 'Sobre nós', link: '/sobre-nos' }
  ];

  constructor(private router: Router, private tokenService: TokenService, private http: HttpClient, private userPhotoService: UserPhotoService) {}

  ngOnInit() {
      this.userPhotoService.photoUrl$.subscribe((url) => {
        this.photoUrl = url;
      });
      if (!this.photoUrl) {
        localStorage.getItem('photoUrl');
      }
  }

  isCurrentPage(link: string): boolean {
    return this.router.url === link;
  }

  abrirLista() {
    this.mostraLista = !this.mostraLista;
  }

  logout() {
    this.tokenService.clearToken();
    this.userPhotoService.clearPhotoUrl();
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
