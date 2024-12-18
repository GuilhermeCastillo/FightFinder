import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private tokenService: TokenService) {}

  isAuthenticated(): boolean {
    return this.tokenService.hasToken();
  }
}
