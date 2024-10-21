import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service'; 
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements CanActivate {
  usuarioLogado: boolean = false;
  semFoto: boolean = true;
  mostraLista: boolean = false;

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof localStorage !== 'undefined') { //se estiver no navegador

      if (this.authService.isAuthenticated()) {
        return true;
      }
    }
    
    this.router.navigate(['/login']);
    return false; // ou alguma lógica de fallback para SSR ou ambientes sem localStorage
  }

  ngOnInit() {
    if (this.canActivate()) {
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
