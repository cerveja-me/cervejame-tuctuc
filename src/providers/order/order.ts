import { Injectable } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';
import { UserProvider } from '../user/user';

@Injectable()
export class OrderProvider {
  backgroundFetch: any;

  constructor(
    private network: NetworkProvider,
    public backgroundMode: BackgroundMode,
    private device: DeviceProvider,
    public platform: Platform,
    public events: Events,
    public user: UserProvider
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
        .catch(err => {
          console.log('err->', err);
        })
    })
  }

  getOrdersAndRing() {
    this.getOrders()
      .then(res => {
        let orders = [];
        orders = res as Array<any>;
        let or = orders.filter(o => !o['actions']);
        if (or.length > 0) {
          console.log('pedido em aberto');
          this.events.publish('neworders', 'neworders');
          this.device.playRingTone();
          this.backgroundMode.moveToForeground();
        }
      })
  }

  prepareBackground() {
    this.backgroundMode.setDefaults({ silent: true })
    this.backgroundMode.overrideBackButton();
    // this.backgroundMode.excludeFromTaskList();
    this.backgroundMode.enable();

    this.backgroundMode.configure;
    this.backgroundMode.on('activate').subscribe(status => {
      console.log('buscando em backgrou a cada 30 segundos');
      this.backgroundFetch = setInterval(() => {
        console.log('buscar');
        this.getOrdersAndRing();
      }, 5000);
    });
    this.backgroundMode.on('deactivate').subscribe(() => {
      clearInterval(this.backgroundFetch);
    });
    this.backgroundMode.on('disable').subscribe(() => {
      console.log('disable');
    });
    this.backgroundMode.on('deactivate').subscribe(() => {
      console.log('deactivate');
    });
    this.backgroundMode.on('failure').subscribe(() => {
      console.log('failure');
    });
  }

  /*metodos de compatibilidade*/
  getOrdersOld() {
    return new Promise((resolve, reject) => {
      this.user.getLoggedUser()
        .then(u => {
          this.network.get_old(this.network.c.OLD_API + this.network.c.OLD_ORDERS + u['id'])
            .then(x => {
              let orders = [];
              orders = <Array<any>>x;
              orders = orders.map(this.convertOrder);
              resolve(orders)
            })
            .catch(e => {
              reject(e)
              // console.log(e);
            })
        })

    })
  }

  convertOrder(a) {
    a.minutes = Math.round(a.tempo);
    a.pagamento = a.payment == 'money' ? 'icon-money' : 'icon-card';
    a.payment = a.payment == 'money' ? 'Dinheiro' : 'Cartão';
    if (a.tempo > 45) {
      a.cardstatus = 'card__status critical';
    } else if (a.tempo > 25) {
      a.cardstatus = 'card__status alert';
    } else {
      a.cardstatus = 'card__status';
    }
    if (a.onWayAt != null) {
      a.btselect = 'card__info__button__icon icon-onway';
    } else if (a.aceptedAt != null) {
      a.btselect = 'card__info__button__icon icon-go';
    } else {
      a.btselect = 'card__info__button__icon icon-view';
    }

    return a;
  }

  aceptOldOrder(o) {
    return new Promise((resolve, reject) => {
      // this.device.stopRingTone();
      this.network.get_old(this.network.c.OLD_API + this.network.c.OLD_ACCEPT_ORDER + o.saleid)
        .then((res) => {
          resolve(res);
        })
    })
  }

  driveToOldOrder(o) {
    return new Promise((resolve, reject) => {
      this.user.getLoggedUser()
        .then(u => {
          let data = {
            sale: o.saleid,
            user: u['id']
          }
          console.log('data', data);
          this.network.post_old(this.network.c.OLD_API + this.network.c.OLD_DELIVERY_ORDER, data)
            .then((res) => {
              // this.user.hyperTrack.createAndAssignAction('delivery',data.sale,o.address.split(', complemento')[0],o.lat,o.lng);
              resolve(res);
            })
        })
    })
  }

  arrivedOnOldOrder(o) {
    return new Promise((resolve, reject) => {
      this.user.getLoggedUser()
        .then(u => {

          let data = {
            sale: o.saleid,
            user: u['id']
          }

          this.network.post_old(this.network.c.OLD_API + this.network.c.OLD_ARRIVED_ORDER, data)
            .then((res) => {
              resolve(res);
            })
        })
    })
  }

  // finishOldOrder(id, rate,comment){
  //   return new Promise((resolve, reject) => {
  //     let u =this.user.getLoggedUser();

  //     let data ={
  //       sale:id,
  //       rate:rate,
  //       comment:comment,
  //       user:u['id']
  //     }
  //     this.device.post(this.device.API+this.device.FINISH_ORDER,data)
  //     .then((res)=>{
  //       this.user.hyperTrack.completeActionWithLookupId(id)
  //       .then(result=>{
  //         console.log('completing action->',result);
  //       })
  //       resolve(res);
  //     })
  //   })

  // }



}
