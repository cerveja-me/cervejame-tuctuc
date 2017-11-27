import { Injectable } from '@angular/core';

import { DeviceProvider } from '../device/device';
import { UserProvider } from '../user/user';

@Injectable()
export class ProductsProvider {

  constructor(
    public device:DeviceProvider,
    public user:UserProvider
    ) {

  }
  getMyProducts(){
    return new Promise((resolve, reject) => {
      // let user = this.user.getLoggedUser();
      // console.log('user->',user);
      // this.device.get(this.device.API+this.device.PRODUCTS+user.zone)
      // .then(products =>{
      //   let p =products.json()
      //   let list=[{title:'Ativos',products:p.filter(o=>o.active)},{title:'Inativos',products:p.filter(o=>!o.active)}]
      //   resolve(list);
      // })
    });
  }

  updateStatus(id, status){
    return new Promise((resolve, reject) => {
      // var pr={id:id,active:status};
      // this.device.post(this.device.API+this.device.UPDATE_PRODUCT,pr)
      // .then(pr=>{
      //   console.log('resultado->',pr);
      //   resolve(pr);
      // })
      // .catch(e=>{
      //   console.log('err->',e);
      // })
    });

  }

}
