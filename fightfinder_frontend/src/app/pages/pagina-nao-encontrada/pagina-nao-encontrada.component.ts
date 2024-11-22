import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagina-nao-encontrada',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrl: './pagina-nao-encontrada.component.css'
})
export class PaginaNaoEncontradaComponent {

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Página não encontrada')
  }
}
