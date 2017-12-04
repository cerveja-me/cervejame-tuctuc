import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import {Md5} from 'ts-md5/dist/md5';

//providers
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';

@Injectable()
export class UserProvider {
  constructor(
    private network:NetworkProvider,
    private device:DeviceProvider,
    private storage:Storage
  ){

  }

  profileLogin(p){
    return new Promise((resolve, reject)=> {
      this.device.getDevice()
      .then( d =>{
        p.device_id=d['id'];
        this.network.post(this.network.c.AUTH,p)
        .then( t=>{
          this.old_login(p)
          .then(u=>{
            this.storage.set(this.network.c.AUTH,t['token']);
            resolve(t);  
          })
          .catch(e=>{
            console.log("erro no login velho ->",e);
          })
        })
        .catch(reject)
      })
      .catch( reject)
    })
  }

  old_login(data){

    return new Promise((resolve, reject)=> {
      let c= {
        email:data.login,
        password:Md5.hashStr(data.password),
        device:'onesignal',
        push:'123'
      }
      // data.password=Md5.hashStr(data.password);            
      this.network.post_old(this.network.c.OLD_API+this.network.c.OLD_AUTH,c)
      .then(u=>{
        this.setLoggedUser(u);
        resolve(u);
        console.log('user_old',u);
      })
    })      
  }
  user:any;
  setLoggedUser(user){
    this.user=user;
    this.storage.set('ols_user_logged',user);
    // this.createOrGetHyperTrack(user);
  }

}
