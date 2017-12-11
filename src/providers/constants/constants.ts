import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsProvider {
  public API:string='http://ec2-54-207-94-27.sa-east-1.compute.amazonaws.com/api/'
  // public API:string='http://localhost:9001/api/';
  // public API:string='http://localhost:1337/127.0.0.1:9001/api/';
  // public API:string='http://10.42.0.1:9001/api/';
  public DEVICE:string='device/';
  public LOCATION:string='location/';
  public PROFILE:string='profile/';
  public SALE:string='sale/';
  public VOUCHER:string='voucher/';
  public AUTH:string=this.PROFILE+'auth/';
  public RATE:string='rate/';
  public ACTION:string='action/';
  public PRODUCTS:string='productzone/';
  public REMOTE_ASSETS:string='https://s3-sa-east-1.amazonaws.com/assests.cerveja.me';
  //public REMOTE_ASSETS:string='https://assets.cerveja.me/';
  GOOGLE_GEOCODE:string ='https://maps.googleapis.com/maps/api/geocode/json?address=#&location=LAT,LNG&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
  GOOGLE_ADDRESS:string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';

  public OLD_API:string = 'http://api.cerveja.me/';
  public OLD_PRODUCTS:string='prodreg/';
  public OLD_UPDATE_PRODUCT:string='prodreg/updateStatus';
  public OLD_DEVICE:string = 'device/';
  public OLD_AUTH:string='auth/user';
  public OLD_ACCEPT_ORDER:string='sale/acc/';
  public OLD_DELIVERY_ORDER:string='sale/onway/';
  public OLD_ARRIVED_ORDER:string='sale/arrived/';
  public OLD_FINISH_ORDER:string='sale/finish/';
  public OLD_LOCATION:string = 'location/';
  public OLD_ORDERS:string='sale/openSales/';


}
