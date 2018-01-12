import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Md5 } from 'ts-md5/dist/md5';

//providers
import { NetworkProvider } from '../network/network';
import { DeviceProvider } from '../device/device';
import { HyperTrack } from '@ionic-native/hyper-track';

@Injectable()
export class UserProvider {
  constructor(
    private network: NetworkProvider,
    private device: DeviceProvider,
    private storage: Storage,
    private hyperTrack: HyperTrack
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
    this.getUserDetails();

    this.createOrGetHyperTrack();
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
  user_details: any;
  getUserDetails() {
    return new Promise((resolve, reject) => {
      if (this.user_details) {
        resolve(this.user_details)
      } else {
        this.storage.get(this.network.c.SELLER)
          .then(ud => {
            if (ud) {
              this.user_details = ud;
              resolve(ud);
            } else {
              this.network.get(this.network.c.SELLER)
                .then(s => {
                  this.storage.set(this.network.c.SELLER, s);
                  resolve(s)
                })
            }
          })
      }
    })
  }

  /** Hyper track functions */
  createOrGetHyperTrack() {
    this.getUserDetails()
      .then(user => {
        this.hyperTrack.getOrCreateUser(user['name'], user['phone'], 'https://cerveja.me/img/mobile/driver/' + user['photo'], user['id'])
          .then(htUser => {
            let htu = JSON.parse(htUser);
            this.hyperTrack.setUserId(htu.id)
              .then(usertrack => {
                this.hyperTrack.startTracking().then(userId => { }, trackingError => { });

                this.hyperTrack.getCurrentLocation().then(location => {
                  console.log('location ht->', location);
                  // Handle location. It's a String representation of a Location's JSON.For example:
                  // '{"mAccuracy":22.601,,"mLatitude":23.123456, "mLongitude":-100.1234567, ...}'
                }, error => { });
              })
          })
      })
  }



}
