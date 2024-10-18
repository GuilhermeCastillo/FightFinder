import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token/token.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private tokenService: TokenService, private router: Router, private authService: AuthService) {}

  canActivate(): boolean { 

    if (this.authService.isAuthenticated()) {  
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
