import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private alertController: AlertController,
    public menuCtrl: MenuController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  closeMenu() {
    this.menuCtrl.close();
  }

  sair() {
    this.menuCtrl.enable(false);
    this.authService.logout();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Sobre este Aplicativo',
      message: 'Aplicativo para acompanhamento e registros de treinos de musculação.</br> Para sugestões, ou reportar bugs, entre em contato atravéz do e-mail: gilvonaldocavalcanti@gmail.com.',
      buttons: ['Ok']
    });
    await alert.present();
  }



}
