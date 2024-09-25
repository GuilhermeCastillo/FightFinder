import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component'; 
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InputSenhaComponent } from './components/inputSenha/inputSenha.component';  
import { InputTextoComponent } from './components/input-texto/input-texto.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component'; 
import { CommonModule } from '@angular/common';
import { BotaoPequenoComponent } from './components/botao-pequeno/botao-pequeno.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LoadingCircleComponent } from './components/loading-circle/loading-circle.component';
import { NgxMaskDirective } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats, MatNativeDateModule } from '@angular/material/core';
import { DatepickerComponent } from './components/datepicker/datepicker.component';


export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [ // declarar componentes 
    AppComponent, 
    ButtonComponent, 
    BotaoPequenoComponent,
    HeaderComponent,
    FooterComponent,
    InputSenhaComponent,
    InputTextoComponent,
    InputRadioComponent, 
    DropdownComponent,
    LoadingCircleComponent,
    NgxMaskDirective,
    DatepickerComponent
  ],
  imports: [ // importar módulos 
    BrowserModule, 
    FormsModule,   
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule, 
    MatInputModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent] // O componente principal que deve ser inicializado
})
export class AppModule { }
