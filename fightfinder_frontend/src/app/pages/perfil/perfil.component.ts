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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, InputSenhaComponent, InputTextoComponent, InputRadioComponent,
    ButtonComponent, BotaoPequenoComponent, DropdownComponent, FormsModule],
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

  editarCampo(index: number): void {
  }
 
  loadUserData() {
    // Simulando uma chamada de API que retorna os dados do perfil do usuário
    const dadosUsuario = {
      nome: 'João da Silva',
      email: 'joao.silva@email.com',
      telefone: '11999999999',
      dataNascimento: '01/01/1990',
      endereco: 'Rua Exemplo, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '12345-678',
      pais: 'Brasil',
      cpf: '123.456.789-00',
      rg: '12.345.678-9',
      estadoCivil: 'Solteiro',
      profissao: 'Desenvolvedor',
      nacionalidade: 'Brasileiro',
      dependentes: '2'
    };
  
    // Preenche os campos com os dados do usuário
    // this.campos = [
    //   { value: dadosUsuario.nome, isEditable: false },
    //   { value: dadosUsuario.email, isEditable: false },
    //   { value: dadosUsuario.telefone, isEditable: false },
    //   { value: dadosUsuario.dataNascimento, isEditable: false },
    //   { value: dadosUsuario.endereco, isEditable: false },
    //   { value: dadosUsuario.cidade, isEditable: false },
    //   { value: dadosUsuario.estado, isEditable: false },
    //   { value: dadosUsuario.cep, isEditable: false },
    //   { value: dadosUsuario.pais, isEditable: false },
    //   { value: dadosUsuario.cpf, isEditable: false },
    //   { value: dadosUsuario.rg, isEditable: false },
    //   { value: dadosUsuario.estadoCivil, isEditable: false },
    //   { value: dadosUsuario.profissao, isEditable: false },
    //   { value: dadosUsuario.nacionalidade, isEditable: false },
    //   { value: dadosUsuario.dependentes, isEditable: false }
    // ];
  }

}