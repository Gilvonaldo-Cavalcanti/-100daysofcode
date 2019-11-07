import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliacaoService } from 'src/app/services/avaliacao.service';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {


  private avaliacao: Avaliacao = {};
  private avaliacaoId = null;
  private loading: any;


  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private avaliacaoService: AvaliacaoService) {

  }

  ngOnInit() {
  }


  async salvarAvaliacao() {
    await this.presentLoading();

    this.avaliacao.userId = this.authService.getAuth().currentUser.uid;
    this.avaliacao.arquivado = false;
    if (this.avaliacaoId) {

    } else {

      let dataAtual = new Date();
      this.avaliacao.criadoEm = dataAtual.toLocaleDateString();

      try {
        await this.avaliacaoService.addAvaliacao(this.avaliacao);
        await this.loading.dismiss();

        this.router.navigateByUrl("tabs/tab3", { skipLocationChange: true });
      } catch (error) {
        this.presentToast('Error ao tentar salvar!');
        this.loading.dismiss();
      }
    }
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...', });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2000
    });
    toast.present();
  }

}
