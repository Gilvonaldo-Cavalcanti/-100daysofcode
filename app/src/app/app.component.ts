import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  pages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    },
    {
      title: 'Home',
      url: '/pages/tab1',
      icon: 'person'
    },
    {
      title: 'Explorer',
      url: '/pages/tab2',
      icon: 'information-circle'
    }, 
    {
      title: 'Conta',
      url: '/pages/tab3',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
