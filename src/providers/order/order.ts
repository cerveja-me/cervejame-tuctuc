import { Injectable } from '@angular/core';

import { NetworkProvider } from '../network/network';

@Injectable()
export class OrderProvider {

  constructor(
    private network: NetworkProvider,

  ) {

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
}
