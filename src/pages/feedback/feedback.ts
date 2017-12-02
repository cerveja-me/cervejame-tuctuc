import { Component } from '@angular/core';
import { NavController, NavParams,ViewController,LoadingController } from 'ionic-angular';
import {HomePage} from '../home/home';
import {OrderProvider } from '../../providers/order/order';

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  rate;
  ord;
  comment;
  loader = this.loading.create({
    content: 'Carregando... Aguarde...'
  });
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loading:LoadingController,
    public order:OrderProvider) {

  }

  ionViewDidLoad() {
    this.ord=this.navParams.get("order");
  }
  finishOrder(){
   if(this.rate){
      this.loader.present();
      this.order.finishOrder(this.ord.id_sale,this.rate,this.comment)
      .then(res=>{
        this.navCtrl.setRoot(HomePage);
        this.loader.dismiss();
      })
      .catch(err=>{
        this.navCtrl.setRoot(HomePage);
        this.loader.dismiss();
      })
    }
  }

}
