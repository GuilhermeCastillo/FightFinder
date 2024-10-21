import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (typeof localStorage !== 'undefined') { //se estiver no navegador

      if (this.authService.isAuthenticated()) {
        return true;
      }
    }
    
    this.router.navigate(['/login']);
    return false; // ou alguma lógica de fallback para SSR ou ambientes sem localStorage
  }
} 
