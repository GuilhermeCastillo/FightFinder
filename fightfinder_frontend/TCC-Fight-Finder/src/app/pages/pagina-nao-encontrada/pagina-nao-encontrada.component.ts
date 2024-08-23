import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent {

}
