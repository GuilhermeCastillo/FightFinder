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
import { InputDataComponent } from './components/input-data/input-data.component';
import { CommonModule } from '@angular/common';
import { BotaoPequenoComponent } from './components/botao-pequeno/botao-pequeno.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LoadingCircleComponent } from './components/loading-circle/loading-circle.component';


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
    InputDataComponent,
    DropdownComponent,
    LoadingCircleComponent,
  ],
  imports: [
    BrowserModule, // importar módulos 
    FormsModule,   
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent] // O componente principal que deve ser inicializado
})
export class AppModule { }
