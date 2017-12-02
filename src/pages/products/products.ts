import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the ProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @Component({
   selector: 'page-products',
   templateUrl: 'products.html',
 })
 export class ProductsPage {
   lists:any=[];
   constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public prod:ProductsProvider) {
   }

   ionViewDidLoad() {
     this.getProducts();
   }
   getProducts(){
     this.prod.getMyProducts()
     .then(list=>{
       this.lists=list;
     })
   }
   updateProduct(id, status){
     this.prod.updateStatus(id,status)
     .then(p=>{
       this.getProducts();
     })
   }

 }
