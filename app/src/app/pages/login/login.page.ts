import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController, MenuController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [
    ScreenOrientation
  ]
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides, { static: false }) slides: IonSlides;

  public userLogin: User = {};
  public userRegister: User = {};
  public loading: any;
  private isLooged: boolean;

  constructor(
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    public menuCtrl: MenuController,
    public screenOrientation: ScreenOrientation

  ) { 
    this.isLooged = authService.isLogged();
    this.menuCtrl.enable(false);

    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

  }

  ngOnInit() {
  }

  segmentChanged(event: any) {

    if (event.detail.value === "login") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

  async login() {
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
      this.menuCtrl.enable(this.isLooged);
      this.router.navigateByUrl("/", { skipLocationChange: true });

    } catch (error) {
      this.presentToast(error.message);
      console.error(error);
    } finally {
      this.loading.dismiss();
      

    }
  }

  async register() {
    await this.presentLoading();
    try {
      await this.authService.register(this.userRegister);
      this.menuCtrl.enable(this.isLooged);
      this.router.navigateByUrl("/", { skipLocationChange: true });
    } catch (error) {
      this.presentToast(error.message);
      console.error(error);
    } finally {
      this.loading.dismiss();
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
