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
import { HttpClientModule } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { provideHttpClient, withFetch } from '@angular/common/http';

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
  ],
  imports: [ // importar módulos 
    BrowserModule, 
    FormsModule,   
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent] // componente principal que deve ser inicializado
})
export class AppModule { }
