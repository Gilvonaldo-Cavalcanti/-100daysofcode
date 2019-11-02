import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import {  MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  private isLooged: boolean;

  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
  ) {
    this.initializeApp();
    this.isLooged = authService.isLogged();
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  sair() {
    console.log("Tá logado? => "+this.isLooged)
    //this.menuCtrl.close();
    //this.router.navigateByUrl("login", { skipLocationChange: true });
    this.authService.logout();
    console.log("(Depois) Tá logado? => "+this.isLooged)
  }


}
