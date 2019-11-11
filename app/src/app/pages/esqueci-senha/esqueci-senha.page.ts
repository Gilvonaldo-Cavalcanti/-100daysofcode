import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.page.html',
  styleUrls: ['./esqueci-senha.page.scss'],
})
export class EsqueciSenhaPage implements OnInit {

  private email: string;
  private loading: any;

  constructor(private auth: AuthService, private toastCtrl: ToastController, private loadingCtrl: LoadingController,) { }

  ngOnInit() {
  }

  async enviarEmail(){
    await this.presentLoading();
    if (this.email != null){
      try {
        await this.auth.resetPassword(this.email);
      }catch (error){
        this.presentToast(error.message);
      } finally {
        this.loading.dismiss();
      }    
    } else {
      this.presentToast("Adicione um endereço de email válido.");
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message, duration: 2000
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...', });
    return this.loading.present();
  }
}
