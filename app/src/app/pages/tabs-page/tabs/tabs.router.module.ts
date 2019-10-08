import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'explorer',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../explorer/explorer.module').then(m => m.ExplorerPageModule)
          }
        ]
      },
      {
        path: 'conta',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../conta/conta.module').then(m => m.ContaPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs-page/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs-page/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
