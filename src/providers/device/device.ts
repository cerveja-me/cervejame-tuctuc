import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
// import { OneSignal } from '@ionic-native/onesignal';
import { NetworkProvider } from '../network/network';
import { ConstantsProvider } from '../constants/constants';
import { Vibration } from '@ionic-native/vibration';
import { NativeRingtones } from '@ionic-native/native-ringtones';


@Injectable()
export class DeviceProvider {
  dev:any;

  constructor(
    private platform:Platform,
    private device:Device,
    private appVersion:AppVersion,
    private vibration: Vibration,
    private net:NetworkProvider,
    public c:ConstantsProvider,
    // private oneSignal:OneSignal,
    private alertCtrl:AlertController,
    private events:Events,
    private ringtones: NativeRingtones

  ) {
    this.createDevice('empty');
    this.prepareAudio();

    if(this.platform.is('cordova')){
      // UXCam.startWithKey("be70a1dceee9857");//contas@cerveja.me
      // UXCam.tagUsersName(this.device.uuid);
      // this.startOneSignal();
    }
  }

  createDevice(push:string){
    return new Promise((resolve, reject)=> {
      var d = {
        id:'',
        push_token: push ||'empty',
        app_version: '1.3',
        app_name: 2,
        app_os: this.device.platform,
        phone_model: this.device.platform,
        device_uuid: this.device.uuid
      }

      this.appVersion.getVersionNumber().then(v=>{
        d.app_version=v;
        this.net.post(this.c.DEVICE,d)
        .then(r=>{
          this.dev=r;
          resolve(this.dev);
        })
        .catch(e=>{
          reject(e);
        })
      })
    })
  }

  getDevice(){
    return new Promise((resolve, reject)=> {
      if(this.dev){
        resolve(this.dev);
      }else{
        this.createDevice('empty')
        .then((d)=>{
          resolve(this.dev);
        })
        .catch( e=>{
          reject(e);
        })
      }
    })
  }

  vibrate:any;
  playRingTone(){
    this.vibrate= setInterval(() =>{
      this.vibration.vibrate(500);
      this.ringtones.playRingtone(this.rings[this.pos].Url);
      setTimeout(function(){
        this.vibration.vibrate(0);
      },500)

    },1000);
  }
  
  rings:any;
  pos:any;
  prepareAudio(){
    this.ringtones.getRingtone()
    .then((ringtones) => {
      this.pos=Math.floor(Math.random() * ringtones.length);
      this.rings=ringtones;
    });
  }

  stopRingTone(){
    this.vibration.vibrate(0);
    clearInterval(this.vibrate);
  }
}
