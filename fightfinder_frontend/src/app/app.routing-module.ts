import { Routes } from '@angular/router'; 
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { MatchLutaComponent } from './pages/match-luta/match-luta.component';
import { MatchTreinoComponent } from './pages/match-treino/match-treino.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';


export const routes: Routes = [

    { path: 'sobre-nos', component: SobreNosComponent },       
    { path: 'match-luta', component: MatchLutaComponent },
    { path: 'match-treino', component: MatchTreinoComponent },
    { path: 'ranking', component: RankingComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent }, 
    { path: 'perfil', component: PerfilComponent }, 
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/cadastro', pathMatch: 'full' }, // Rota padrão
    { path: '**', component: PaginaNaoEncontradaComponent }, // Rota para URLs desconhecidas

];
