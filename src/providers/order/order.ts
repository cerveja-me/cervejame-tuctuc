import { Injectable } from '@angular/core';

import { NetworkProvider } from '../network/network';

@Injectable()
export class OrderProvider {

  constructor(
    private network: NetworkProvider,

  ) {
  }

  getOrders(){
    return new Promise((resolve, reject) => {
      this.network.get(this.network.c.ACTION)
      .then(orders=>{
        resolve(orders)
      })
      .catch( e =>{
        reject(e)
        // console.log(e);
      })
    })
  }

  aceptOrder(o){
    return new Promise((resolve, reject) => {
      // this.device.stopRingTone();
      // this.device.get(this.device.API+this.device.ACCEPT_ORDER+o.saleid)
      // .then((res)=>{
      //   resolve(res.json());
      // })
    })
  }
}
