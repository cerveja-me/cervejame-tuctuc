import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {HomePage} from '../home/home';
import {OrderProvider } from '../../providers/order/order';


@Component({
  selector: 'page-oldfeedback',
  templateUrl: 'oldfeedback.html',
})
export class OldfeedbackPage {
  rate;
  ord;
  comment;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public order:OrderProvider) {
  }

  ionViewDidLoad() {
    this.ord=this.navParams.get("order");
  }
  finishOrder(){
   if(this.rate){
      this.order.finishOldOrder(this.ord.saleid,this.rate,this.comment )
      .then(res=>{
        this.navCtrl.popToRoot();
      })
      .catch(err=>{
        this.navCtrl.popToRoot();
      })
    }
  }

}
