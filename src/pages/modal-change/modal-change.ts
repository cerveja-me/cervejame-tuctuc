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
    let value = this.ord.value;
    let nota=5;
    this.changes.push({
      valor:(Math.floor(this.ord.value/nota)+1)*nota,
      change:(Math.floor(this.ord.value/nota)+1)*nota-this.ord.value
    });
    nota=10;
    this.changes.push({
      valor:(Math.floor(this.ord.value/nota)+1)*nota,
      change:(Math.floor(this.ord.value/nota)+1)*nota-this.ord.value
    });
    nota=20;
    this.changes.push({
      valor:(Math.floor(this.ord.value/nota)+1)*nota,
      change:(Math.floor(this.ord.value/nota)+1)*nota-this.ord.value
    });
    nota=50;
    this.changes.push({
      valor:(Math.floor(this.ord.value/nota)+1)*nota,
      change:(Math.floor(this.ord.value/nota)+1)*nota-this.ord.value
    });
    nota=100;
    this.changes.push({
      valor:(Math.floor(this.ord.value/nota)+1)*nota,
      change:(Math.floor(this.ord.value/nota)+1)*nota-this.ord.value
    });

    console.log('ionViewDidLoad ModalChangePage', this.changes);
  }


}
