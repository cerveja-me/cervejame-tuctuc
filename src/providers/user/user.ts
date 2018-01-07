import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

//providers
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';

@Injectable()
export class UserProvider {
  constructor(
    private network: NetworkProvider,
    private device: DeviceProvider,
    private storage: Storage
  ) {

  }

  profileLogin(p) {
    return new Promise((resolve, reject) => {
      this.device.getDevice()
        .then(d => {
          p.device_id = d['id'];
          this.network.post(this.network.c.AUTH, p)
            .then(t => {
              this.storage.set(this.network.c.AUTH, t['token']);
              resolve(t);
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }


  user: any;
  setLoggedUser(user) {
    this.user = user;
    this.storage.set('ols_user_logged', user);
    // this.createOrGetHyperTrack(user);
  }

  getLoggedUser() {
    return new Promise((resolve, reject) => {
      if (this.user) {
        resolve(this.user);
      } else {
        this.storage.get('ols_user_logged')
          .then(u => {
            resolve(u);
            this.user = u;
          })
      }
    })
  }

}
