import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TreinoDetalhePage } from './treino-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: TreinoDetalhePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TreinoDetalhePage]
})
export class TreinoDetalhePageModule {}
