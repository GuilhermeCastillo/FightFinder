import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-match-treino',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './match-treino.component.html',
  styleUrl: './match-treino.component.css'
})

export class MatchTreinoComponent {
  
  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Treinar')
  }
}
