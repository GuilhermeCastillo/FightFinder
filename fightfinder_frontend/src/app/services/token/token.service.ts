import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {  
  private authTokenKey = 'authToken';


  hasToken(): boolean {
      if (localStorage.getItem(this.authTokenKey)) {
        return true
      }
    
    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  clearToken(): void {
      localStorage.removeItem(this.authTokenKey);
  }
}
