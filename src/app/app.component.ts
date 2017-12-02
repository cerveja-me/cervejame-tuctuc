import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/storage';

//providers
import { UserProvider } from '../providers/user/user';
import { DeviceProvider } from '../providers/device/device';

//relatedpages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ProductsPage } from '../pages/products/products';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
) {
    // used for an example of ngFor and navigation
    this.pages = [
    { title: 'Pedidos', component: HomePage },
    { title: 'Produtos', component: ProductsPage },
  ];
  this.storage.get('profile/auth/')
  .then((userLogged) => {
    if (userLogged) {
      this.rootPage = HomePage;
    } else {
      this.rootPage = LoginPage;
    }
    this.initializeApp();
  });
}

initializeApp() {
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
    setTimeout(() => {
      this.splashScreen.hide();
    }, 500);
    // this.device.startOneSignal();
  });
}

openPage(page) {
  // Reset the content nav to have just this page
  // we wouldn't want the back button to show in this scenario
  this.nav.setRoot(page.component);
}
}
