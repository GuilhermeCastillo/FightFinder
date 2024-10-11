import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private isBrowser: boolean;
  private tokenKey = 'authToken';

  constructor() { 
    this.isBrowser = typeof window !== 'undefined';
  }

  // Armazena o token no localStorage
  setToken(token: string): void {
    if (this.isBrowser) { 
      localStorage.setItem(this.tokenKey, token); 
    }
  }

  // Retorna o token armazenado no localStorage
  getToken(): string | null {
    if (this.isBrowser) { 
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Remove o token do localStorage
  clearToken(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.tokenKey);
    } 
  }

  // Verifica se o token existe
  hasToken(): boolean {
    return !!this.getToken();
  }
}
