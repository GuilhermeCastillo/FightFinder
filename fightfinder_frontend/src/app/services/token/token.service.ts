import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {  
  private authTokenKey = 'authToken';

  private isLocalStorageAvailable(): boolean {
    return typeof localStorage !== 'undefined';
  }

  hasToken(): boolean {
    if (this.isLocalStorageAvailable()) {
      if (localStorage.getItem(this.authTokenKey)) {
        return true
      }
       
    }
    return false;
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.authTokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.authTokenKey, token);
    }
  }

  clearToken(): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(this.authTokenKey);
    }
  }
}
