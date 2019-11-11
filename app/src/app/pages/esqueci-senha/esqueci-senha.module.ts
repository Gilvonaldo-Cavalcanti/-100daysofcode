import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EsqueciSenhaPage } from './esqueci-senha.page';

const routes: Routes = [
  {
    path: '',
    component: EsqueciSenhaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EsqueciSenhaPage]
})
export class EsqueciSenhaPageModule {}
