import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderProvider {

  constructor(public http: HttpClient) {
    console.log('Hello OrderProvider Provider');
  }

  getOrders(){
    return new Promise((resolve, reject) => {
      // let u=this.user.getLoggedUser();
      // this.device.get(this.device.API+this.device.ORDERS+u['id'])
      // .then((res)=>{
      //   let orders = res.json();
      //   orders=orders.map(this.convertOrder);
      //   resolve(orders);
      // })
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
