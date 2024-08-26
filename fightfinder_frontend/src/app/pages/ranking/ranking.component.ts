import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { ButtonComponent } from '../../components/button/button.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, InputTextoComponent, ButtonComponent, DropdownComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {

}
