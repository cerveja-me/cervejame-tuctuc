import { Injectable } from '@angular/core';

import { DeviceProvider } from '../device/device';
import { UserProvider } from '../user/user';
import { NetworkProvider } from '../network/network';

@Injectable()
export class ProductsProvider {

  constructor(
    public device:DeviceProvider,
    private network:NetworkProvider
    ) {

  }
  getMyProducts(){
    return new Promise((resolve, reject) => {
      this.network.get(this.network.c.PRODUCTS)
      .then(list =>{
        resolve(list);
      })
    });
  }

  updateStatus(id, status){
    return new Promise((resolve, reject) => {
      var pr={id:id,active:status};
      this.network.put(this.network.c.PRODUCTS+pr.id,pr)
      .then(pr=>{
        console.log('resultado->',pr);
        resolve(pr);
      })
      .catch(e=>{
        console.log('err->',e);
      })
    });

  }

}
