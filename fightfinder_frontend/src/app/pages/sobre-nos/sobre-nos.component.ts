import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './sobre-nos.component.html',
  styleUrl: './sobre-nos.component.css'
})
export class SobreNosComponent { 
  dropdown1: boolean = false;
  dropdown2: boolean = false;
  dropdown3: boolean = false;

  mostraDesc(numero: number): void { 
    if (numero === 1) { 
      this.dropdown1 = !this.dropdown1;
    } else if (numero === 2) { 
      this.dropdown2 = !this.dropdown2;
    } else if (numero === 3) {
      this.dropdown3 = !this.dropdown3;
    } 
  }
}
