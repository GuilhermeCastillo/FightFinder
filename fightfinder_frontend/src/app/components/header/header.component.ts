import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  usuarioLogado: boolean = false;
  semFoto: boolean = true; 

  constructor(private tokenService: TokenService) {}

  ngOnInit() {
    if (this.tokenService.hasToken()) {
      this.usuarioLogado = true;
    }
  }

}
