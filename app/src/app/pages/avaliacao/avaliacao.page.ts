import { Component, OnInit } from '@angular/core';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AvaliacoesService } from 'src/app/services/avaliacao.service';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.page.html',
  styleUrls: ['./avaliacoes.page.scss'],
})
export class AvaliacoesPage implements OnInit {


  private avaliacao: Avaliacao = {};
  private avaliacaoService: AvaliacoesService;
  private avaliacaoId = null;
  private loading: any;

  constructor( private router: Router,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService) { }

  ngOnInit() {
  }


  async salvarAvaliacao(){
    await this.presentLoading();
    
    this.avaliacao.userId = this.authService.getAuth().currentUser.uid;

    if (this.avaliacaoId){

    }else {

      try {
        await this.avaliacaoService.addAvaliacao(this.avaliacao);
        await this.loading.dismiss();

        this.router.navigateByUrl("", { skipLocationChange: true });
      }catch (error){
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
