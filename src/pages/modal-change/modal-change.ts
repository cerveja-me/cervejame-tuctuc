import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-change',
  templateUrl: 'modal-change.html',
})
export class ModalChangePage {
  ord;
  changes=[]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.ord=this.navParams.get("order");
    let value = this.ord.payment_value;
    let nota=5;
    this.changes.push({
      valor:(Math.floor(this.ord.payment_value/nota)+1)*nota,
      change:(Math.floor(this.ord.payment_value/nota)+1)*nota-this.ord.payment_value
    });
    nota=10;
    this.changes.push({
      valor:(Math.floor(this.ord.payment_value/nota)+1)*nota,
      change:(Math.floor(this.ord.payment_value/nota)+1)*nota-this.ord.payment_value
    });
    nota=20;
    this.changes.push({
      valor:(Math.floor(this.ord.payment_value/nota)+1)*nota,
      change:(Math.floor(this.ord.payment_value/nota)+1)*nota-this.ord.payment_value
    });
    nota=50;
    this.changes.push({
      valor:(Math.floor(this.ord.payment_value/nota)+1)*nota,
      change:(Math.floor(this.ord.payment_value/nota)+1)*nota-this.ord.payment_value
    });
    nota=100;
    this.changes.push({
      valor:(Math.floor(this.ord.payment_value/nota)+1)*nota,
      change:(Math.floor(this.ord.payment_value/nota)+1)*nota-this.ord.payment_value
    });

    console.log('ionViewDidLoad ModalChangePage', this.changes);
  }


}
