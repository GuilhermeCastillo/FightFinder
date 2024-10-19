import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor(private tokenService: TokenService) { 
    this.isBrowser = typeof window !== 'undefined';
  }

  isAuthenticated(): boolean { 
    // return this.tokenService.hasToken();
    const token = localStorage.getItem('authToken');
    return token !== null; 
  }
  
}
