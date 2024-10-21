import { RouterModule, Routes } from '@angular/router'; 
import { HomeComponent } from './pages/home/home.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { MatchLutaComponent } from './pages/match-luta/match-luta.component';
import { MatchTreinoComponent } from './pages/match-treino/match-treino.component';
import { SobreNosComponent } from './pages/sobre-nos/sobre-nos.component';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core'; 

export const routes: Routes = [

    { path: 'sobre-nos', component: SobreNosComponent, canActivate: [AuthGuard] },       
    { path: 'match-luta', component: MatchLutaComponent, canActivate: [AuthGuard] },
    { path: 'match-treino', component: MatchTreinoComponent, canActivate: [AuthGuard] },
    { path: 'ranking', component: RankingComponent, canActivate: [AuthGuard] },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }, 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent }, 
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Rota padrão
    { path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard] }, // Rota para URLs desconhecidas

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }