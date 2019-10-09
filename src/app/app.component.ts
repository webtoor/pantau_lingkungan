import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import { Platform, ToastController, Events} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  public appPages = [
    {
      title: 'Formulir',
      url: '/home',
      icon: 'clipboard'
    },
    {
      title: 'Akun',
      url: '/akun',
      icon: 'contact'
    }
  ];
  emailShows
  backButtonSubscription
  counts :number = 0;
  constructor(
    public events : Events,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public toastController : ToastController
  ) {
    const dataUser = JSON.parse(localStorage.getItem('userAuth'));
    if(dataUser){
      this.emailShows = dataUser.email;
      }
    events.subscribe('email', (email) => {
      this.emailShows = email;
    });
    this.initializeApp();
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#009624');
      this.statusBar.styleBlackTranslucent();
    });
  }

  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.counts++
      if((window.location.pathname == '/login') || (window.location.pathname == '/register') || (window.location.pathname == '/home') || (window.location.pathname == '/loader')){
        if(this.counts == 2){
          navigator['app'].exitApp();
          this.counts = 0;
        }
        this.presentToast('Tekan sekali lagi untuk keluar')
      }else{
        this.counts = 0
        window.history.back();
      }
    }); 
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
