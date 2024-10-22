import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from '../services/token/token.service'; // Certifique-se de importar corretamente o TokenService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const hasToken = this.tokenService.hasToken(); // Verifica se o token existe

    if (!hasToken) {
      this.router.navigate(['/login']); // Redireciona para a tela de login se não houver token
      return false; // Bloqueia o acesso à rota
    }

    return true; // Permite o acesso à rota
  }
}
