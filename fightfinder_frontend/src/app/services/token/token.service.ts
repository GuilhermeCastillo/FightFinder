import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'authToken';

  constructor() { }

  // Armazena o token no localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Retorna o token armazenado no localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Remove o token do localStorage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Verifica se o token existe
  hasToken(): boolean {
    return !!this.getToken();
  }
}
