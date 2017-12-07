import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform,Events,AlertController,NavController } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';
import { OneSignal } from '@ionic-native/onesignal';
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
    private oneSignal:OneSignal,
    private alertCtrl:AlertController,
    private events:Events,
    private ringtones: NativeRingtones

  ) {
    this.createDevice('empty');
    this.prepareAudio();

    if(this.platform.is('cordova')){
      // UXCam.startWithKey("be70a1dceee9857");//contas@cerveja.me
      // UXCam.tagUsersName(this.device.uuid);
      this.startOneSignal();
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

  this.oneSignal.handleNotificationOpened().subscribe((text) => {
    console.log('Opened-> ',text);
  });

  startOneSignal(){
    if(this.platform.is('cordova')){
      var settings:any={kOSSettingsKeyAutoPrompt:true};
      this.oneSignal.iOSSettings(settings);
      this.oneSignal.startInit('2c98ff23-918f-4620-939c-ebae678da341', '504554673032');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

      this.oneSignal.handleNotificationReceived()
      .subscribe((text) => {
        let alert = this.alertCtrl.create({
          title: text.payload.title,
          message: text.payload.body,
          buttons: ['Ok']
        });

        if(text.payload.additionalData !==null){
          let d= text.payload.additionalData;
          console.log('alert-> ',d);
          this.events.publish(d.action, text.payload);
        }
      });


      this.oneSignal.endInit();
      this.oneSignal.registerForPushNotifications();
      this.oneSignal.getIds()
      .then(res=>{
        this.createDevice(res.userId);
        this.events.publish('push_connected', {push:res.userId});
      })
    }
  }

  oneSignalTagZone(tag:string,zone:string){
    if(this.platform.is('cordova')){
      this.oneSignal.sendTag(tag, zone);
    }
  }

}
