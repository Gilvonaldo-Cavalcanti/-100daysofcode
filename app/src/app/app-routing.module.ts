import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [

  { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' , canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule', canActivate: [LoginGuard] },
  { path: 'treino', loadChildren: './pages/treino/treino.module#TreinoPageModule', canActivate: [AuthGuard] },
  { path: 'treino-detalhe/:id', loadChildren: './pages/treino-detalhe/treino-detalhe.module#TreinoDetalhePageModule', canActivate: [AuthGuard] },
  { path: 'avaliacao', loadChildren: './pages/avaliacao/avaliacao.module#AvaliacoesPageModule', canActivate: [AuthGuard] },
  { path: 'treinosarquivados', loadChildren: './pages/treinosarquivados/treinosarquivados.module#TreinosarquivadosPageModule', canActivate: [AuthGuard]  },
  { path: 'avaliacoesarquivadas', loadChildren: './pages/avaliacoesarquivadas/avaliacoesarquivadas.module#AvaliacoesarquivadasPageModule', canActivate: [AuthGuard] },
  { path: 'perfil', loadChildren: './pages/perfil/perfil.module#PerfilPageModule', canActivate: [AuthGuard] },
  { path: 'esqueci-senha', loadChildren: './pages/esqueci-senha/esqueci-senha.module#EsqueciSenhaPageModule', canActivate: [LoginGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
