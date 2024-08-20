import { Routes } from '@angular/router'; 
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RankingComponent } from './pages/ranking/ranking.component';


export const routes: Routes = [
           
    { path: 'ranking', component: RankingComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'perfil', component: PerfilComponent }, 
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota padrão
    { path: '**', component: PaginaNaoEncontradaComponent }, // Rota para URLs desconhecidas

];
