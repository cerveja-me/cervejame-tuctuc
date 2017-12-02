import { Injectable } from '@angular/core';
import { Platform,Events } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';
@Injectable()
export class OrderProvider {
  backgroundFetch:any;

  constructor(
    private network: NetworkProvider,
    public backgroundMode: BackgroundMode,
    private device: DeviceProvider,
    public platform: Platform,
    public events: Events

  ) {
    this.platform.ready().then(() => {
      this.prepareBackground();
    })
  }

  getOrders() {
    return new Promise((resolve, reject) => {
      this.network.get(this.network.c.ACTION)
      .then(orders => {
        resolve(orders)
      })
      .catch(e => {
        reject(e)
        // console.log(e);
      })
    })
  }

  aceptOrder(o) {
    const a = {
      id_sale: o.id_sale,
      action: 1
    }
    return this.createAction(a);
  }

  driveToOrder(o) {
    const a = {
      id_sale: o.id_sale,
      action: 2
    }
    return this.createAction(a);
  }

  arrivedOnOrder(o) {
    const a = {
      id_sale: o.id_sale,
      action: 3
    }
    return this.createAction(a);
  }

  finishOrder(sale, rate, comment) {
    return new Promise((resolve, reject) => {
      const a = {
        id_sale: sale,
        action: 4
      }
      this.createAction(a)
      .then(ret => {
        const r = {
          id_sale: sale,
          who: 1,
          rate: rate,
          comment: comment
        }
        this.network.post(this.network.c.RATE, r)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        })
      })
    })
  }

  createAction(o) {
    return new Promise((resolve, reject) => {
      // this.device.stopRingTone();
      this.network.post(this.network.c.ACTION, o)
      .then((res) => {
        resolve(res);
      })
      .catch(err =>{
        console.log('err->',err);
      })
    })
  }

  getOrdersAndRing(){
    this.getOrders()
    .then(res=>{
      let orders=[];
      orders=res as Array<any>;
      let or=orders.filter(o=>!o['actions']);
      if(or.length>0){
        console.log('pedido em aberto');
        this.events.publish('neworders','neworders');
        this.device.playRingTone();
        this.backgroundMode.moveToForeground();
      }
    })
  }

  prepareBackground(){
    this.backgroundMode.setDefaults({silent:true})
    this.backgroundMode.overrideBackButton();
    // this.backgroundMode.excludeFromTaskList();
    this.backgroundMode.enable();

    this.backgroundMode.configure;
    this.backgroundMode.on('activate').subscribe(status=>{
      console.log('buscando em backgrou a cada 30 segundos');
      this.backgroundFetch= setInterval(() =>{
        console.log('buscar');
        this.getOrdersAndRing();
      },5000);
    });
    this.backgroundMode.on('deactivate').subscribe(()=>{
      clearInterval(this.backgroundFetch);
    });
    this.backgroundMode.on('disable').subscribe(()=>{
      console.log('disable');
    });
    this.backgroundMode.on('deactivate').subscribe(()=>{
      console.log('deactivate');
    });
    this.backgroundMode.on('failure').subscribe(()=>{
      console.log('failure');
    });
  }
}
