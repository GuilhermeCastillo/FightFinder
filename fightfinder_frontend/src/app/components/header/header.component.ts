import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioLogado: boolean = false;
  semFoto: boolean = true;
  mostraLista: boolean = false;

  constructor(private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    if (this.tokenService.hasToken()) {
      this.usuarioLogado = true;
    }
  }


  abrirLista() {
    this.mostraLista = !this.mostraLista;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }

}
