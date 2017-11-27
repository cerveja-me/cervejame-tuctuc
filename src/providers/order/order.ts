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
    const a={
      id_sale:o.id_sale,
      action:1
    }
    return this.createAction(a);
  }
  driveToOrder(o){
    const a={
      id_sale:o.id_sale,
      action:2
    }
    return this.createAction(a);
  }

  createAction(o){
    console.log('action',o);
    return new Promise((resolve, reject) => {
      // this.device.stopRingTone();
      this.network.post(this.network.c.ACTION,o)
      .then((res)=>{
        resolve(res);
      })
    })
  }
}
