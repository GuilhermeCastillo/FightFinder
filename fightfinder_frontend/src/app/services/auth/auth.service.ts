import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isBrowser: boolean;

  constructor(private tokenService: TokenService,) { 
    this.isBrowser = typeof window !== 'undefined';
  }

  getToken(): string | null {
    // if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    // }
    // return null;
  }

  isAuthenticated(): boolean { 
      const token = this.getToken();
      return token !== null; 
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isAuthenticated();
    }
  }
}
