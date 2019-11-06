import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvaliacoesarquivadasPage } from './avaliacoesarquivadas.page';

const routes: Routes = [
  {
    path: '',
    component: AvaliacoesarquivadasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvaliacoesarquivadasPage]
})
export class AvaliacoesarquivadasPageModule {}
