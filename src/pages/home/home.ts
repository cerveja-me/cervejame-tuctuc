import { Component } from '@angular/core';
import { NavController,Events,IonicApp,LoadingController,AlertController ,ModalController,Platform } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

import { DeviceProvider } from '../../providers/device/device';
import { OrderProvider } from '../../providers/order/order';

import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  orders;
  old_orders;
  timer;
  loader = this.loading.create({
    content: 'Carregando... Aguarde...'
  });
  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public app  : IonicApp,
    public events: Events,
    public order:OrderProvider,
    private loading:LoadingController,
    private alert:AlertController,
    public device:DeviceProvider) {
      
    this.events.subscribe('neworders', data=>{
      console.log('abriu o evento buscar');
      this.findOrders();
    });

  }
  ionViewDidEnter(){
    this.findOrders();
  }

  doRefresh(refresher) {
    this.order.getOrders()
    .then(or=>{
      this.orders=or;
      refresher.complete();
    })
    .catch(e=>{
      refresher.complete();
    });

  }
  findOrders(){
    this.loader.present();
    this.order.getOrders()
    .then(or=>{
      this.orders=or;
      this.loader.dismiss();
    })
    .catch(e=>{
      this.loader.dismiss();
    });
  }

  openOrder(o){
    if(o.aceptedAt==null){
      this.order.aceptOrder(o);
    }
    this.device.stopRingTone();
    this.navCtrl.push(DetailsPage,{order:o})
  }
}
