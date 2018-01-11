import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

import { UserProvider } from '../../providers/user/user';
import { DeviceProvider } from '../../providers/device/device';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  profile:any={
    login:null,
    password:null
  };
  constructor(
    private navCtrl:NavController,
    private device:DeviceProvider,
    private user:UserProvider,
    private alert: AlertController

  ) {
  }

  doLoginForm(){
    this.user.profileLogin(this.profile)
    .then(res=>{
      this.navCtrl.setRoot(HomePage);
    })
    .catch( e =>{
      this.alert.create({
        title:'ERRO',
        message:e.error.message,
        buttons:[
          {
            text:'ok'
          }
        ]
      }).present();
    })
  }

}
