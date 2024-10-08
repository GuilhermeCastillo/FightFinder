import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { InputSenhaComponent } from '../../components/inputSenha/inputSenha.component';
import { InputTextoComponent } from '../../components/input-texto/input-texto.component';
import { InputRadioComponent } from '../../components/input-radio/input-radio.component';
import { ButtonComponent } from '../../components/button/button.component';
import { BotaoPequenoComponent } from '../../components/botao-pequeno/botao-pequeno.component';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, InputSenhaComponent, InputTextoComponent, InputRadioComponent, ButtonComponent, BotaoPequenoComponent, DropdownComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  semFoto: boolean = false;
  campoBloqueado: boolean = true;
  imageUrl: string | ArrayBuffer | null = null;

  escolherFotoPerfil(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const maxSizeInMB = 5; // Limite de tamanho em MB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        alert(`O arquivo é muito grande. O tamanho máximo permitido é ${maxSizeInMB} MB.`);
        fileInput.value = ''; // Limpa o input
        return;
      } else { // Continue com o processamento do arquivo
        const reader = new FileReader();

        reader.onload = () => {
          this.imageUrl = reader.result;
        };

        reader.readAsDataURL(file); 
      } 
    } 
  }

  onOptionSelected(option: string) {
    console.log('Opção selecionada:', option); 
  }

  editarCampo() {
    this.campoBloqueado = !this.campoBloqueado; 
    console.log('campo bloqueado', this.campoBloqueado);
  }


//   {
//     "cpf": "12345678900",
//     "genero": "M",
//     "peso": 80,
//     "altura": 1.75,
//     "telefone": "(11) 98765-4321", NÃO OBGTORIO
//     "cidade": "São Paulo",
//     "estado": "SP",
//     "pais": "Brasil",
//     "data_nascimento": "1990-05-15",
//     "nome": "João Silva",
//     "academia": "Academia de Lutas São Paulo", NÃO OBGTORIO
//     "modalidade": "BJJ"
//      "imagem" NÃO OBGTORIO
// } 

// MODALITIES_CHOICES = [
//   ("BJJ", "Brazilian Jiu-Jitsu"),
//   ("MMA", "Mixed Martial Arts"),
//   ("BOX", "Boxing"),
//   ("MT", "Muay Thai"),
//   ("JUDO", "Judo"),
//   ("WREST", "Wrestling"),
//   ("KARATE", "Karate"),
//   ("TKD", "Taekwondo"),
//   ("INI", "Iniciante"),
// ]

// GENDER_CHOICES = [
//   ('M', 'Masculino'),
//   ('F', 'Feminino'),
// ] 
}
