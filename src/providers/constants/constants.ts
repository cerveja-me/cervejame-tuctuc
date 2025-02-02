import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsProvider {
  public API:string='https://api.cerveja.me/api/'
  public DEVICE:string='device/';
  public LOCATION:string='location/';
  public PROFILE:string='profile/';
  public SALE:string='sale/';
  public VOUCHER:string='voucher/';
  public AUTH:string=this.PROFILE+'auth/';
  public RATE:string='rate/';
  public ACTION:string='action/';
  public SELLER:string  = 'seller/';
  public PRODUCTS:string='productzone/';
  public REMOTE_ASSETS:string='https://s3-sa-east-1.amazonaws.com/assests.cerveja.me';
  //public REMOTE_ASSETS:string='https://assets.cerveja.me/';
  GOOGLE_GEOCODE:string ='https://maps.googleapis.com/maps/api/geocode/json?address=#&location=LAT,LNG&rankby=distance&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';
  GOOGLE_ADDRESS:string = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=#&key=AIzaSyCviMvRgOLra4U-obeRi33K0Cur5WlGTQg';

}
