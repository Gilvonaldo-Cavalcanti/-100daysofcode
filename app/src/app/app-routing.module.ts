import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [

  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'treino', loadChildren: './pages/treino/treino.module#TreinoPageModule' },
  { path: 'treino-detalhe/:id', loadChildren: './pages/treino-detalhe/treino-detalhe.module#TreinoDetalhePageModule' },
  { path: 'avaliacoes', loadChildren: './pages/avaliacoes/avaliacoes.module#AvaliacoesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
