import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, AlertController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { CallNumber } from '@ionic-native/call-number';


import { OrderProvider } from '../../providers/order/order';
import { DeviceProvider } from '../../providers/device/device';

import { FeedbackPage } from '../feedback/feedback';
import { ModalChangePage } from '../modal-change/modal-change';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  ord;
  d;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public device: DeviceProvider,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public order: OrderProvider,
    private launchNavigator: LaunchNavigator,
    private googleMaps: GoogleMaps,
    private callNumber: CallNumber
  ) {
  }

  ionViewDidLoad() {
    this.ord = this.navParams.get("order");
    if (this.ord.icon ==="icon-onway") {
      this.ord.btselect = 'concluir';
    } else {
      this.ord.btselect = 'entregar';
    }
    this.loadMap();
  }

  openChangeInformation() {
    this.navCtrl.push(ModalChangePage, { order: this.ord });
  }

  loadMap() {
    // let element: HTMLElement = document.getElementById('map');
    // let map: GoogleMap = this.googleMaps.create(element);
    // map.one(GoogleMapsEvent.MAP_READY).then(
    //   () => {
    //     // create LatLng object
    //     let ionic: LatLng = new LatLng(this.ord.lat, this.ord.lng);
    //
    //     // create CameraPosition
    //     let position: CameraPosition = {
    //       target: ionic,
    //       zoom: 15,
    //       tilt: 30
    //     };
    //     map.moveCamera(position);
    //     let markerOptions: MarkerOptions = {
    //       position: ionic
    //     };
    //     map.addMarker(markerOptions);
    //   }
    //   );
    //   map.setClickable(false);


  }

  callToClient() {
    this.callNumber.callNumber(this.ord.phone, true)
    .then(() => console.log('Launched dialer!'))
    .catch(() => console.log('Error launching dialer'));
  }

  arrivedOnOrder() {
    if (this.ord && this.ord.btselect == 'concluir') {
      this.order.arrivedOnOrder(this.ord);
      let alert = this.alertCtrl.create({
        title: "Aviso Enviado",
        message: "Enviamos uma notificação para o cliente!",
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  startDelivery() {
    //abrir o aplicativo preferencia de mapas
    this.openNavigation();
    this.order.driveToOrder(this.ord)
    .then( lo =>{
      this.ord.btselect='concluir';
    })
  }
  openNavigation() {
    // console.log('rota',this.ord.address.split(', complemento')[0]);
    this.launchNavigator.navigate(this.ord.position_maps.x+','+this.ord.position_maps.y)
    .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
    );

  }

  finish() {
    this.navCtrl.push(FeedbackPage, { order: this.ord });
  }

}
