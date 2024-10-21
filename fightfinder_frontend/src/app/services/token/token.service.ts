import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {  

  private authTokenKey = 'authToken';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  hasToken(): boolean {
    if (this.isBrowser()) {
      console.log("AUTH TOKENKEY: " , localStorage.getItem(this.authTokenKey));
      return !!localStorage.getItem(this.authTokenKey);
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.authTokenKey);
    }
    return null;
  }

  setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.authTokenKey, token);
    }
  }

  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.authTokenKey);
    }
  } 
}
