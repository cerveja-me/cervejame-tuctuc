import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HttpClientModule } from '@angular/common/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { IonicImageLoader } from 'ionic-image-loader';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version';
import { Vibration } from '@ionic-native/vibration';
import { NativeRingtones } from '@ionic-native/native-ringtones';
// import { HyperTrack } from '@ionic-native/hyper-track';
import { Keyboard } from '@ionic-native/keyboard';
import { CallNumber } from '@ionic-native/call-number';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { DetailsPage } from '../pages/details/details';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ProductsPage } from '../pages/products/products';
import { ModalChangePage } from '../pages/modal-change/modal-change';
import { OlddetailsPage } from '../pages/olddetails/olddetails';

import { ConstantsProvider } from '../providers/constants/constants';
import { UserProvider } from '../providers/user/user';
import { DeviceProvider } from '../providers/device/device';
import { NetworkProvider } from '../providers/network/network';
import { OrderProvider } from '../providers/order/order';
import { ProductsProvider } from '../providers/products/products';

class AppVersionMock extends AppVersion {
  constructor(){super();}
  getVersionNumber(){return new Promise((resolve, reject) => {resolve( '2.0.6');})}
}
class KeyboardMock extends Keyboard {

  constructor() {super();}
  show(){}
  close(){}
}

class DeviceMock extends Device{
  get cordova(): string{ return "7.0.1";}
  get isVirtual(): boolean { return true;}
  get manufacturer() : string { return "Desenvolvimento";}
  get model() : string { return "Browser - Chrome";}
  get platform() : string { return "Browser";}
  get serial() : string { return "unknown";}
  get uuid() : string { return "1231231-8794564-e7a91992-ebcb67fe33";}
  get version(): string { return "7.1.1"; }
}

class SplashScreenMock extends SplashScreen{
  hide(){}
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DetailsPage,
    FeedbackPage,
    ProductsPage,
    ModalChangePage,
    OlddetailsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageLoader.forRoot(),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    DetailsPage,
    FeedbackPage,
    ProductsPage,
    ModalChangePage,
    OlddetailsPage
  ],
  providers: [
    AppVersion,
    StatusBar,
    SplashScreen,
    CallNumber,
    LaunchNavigator,
    Device,
    GoogleMaps,
    BackgroundMode,
    Vibration,
    CallNumber,
    NativeRingtones,
    OneSignal,
    // HyperTrack,
    { provide: AppVersion, useClass: AppVersionMock },
    { provide: SplashScreen, useClass:SplashScreenMock },
    { provide: Device, useClass: DeviceMock },
    { provide: Keyboard,useClass:KeyboardMock },//coment before build to mobile

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConstantsProvider,
    UserProvider,
    DeviceProvider,
    NetworkProvider,
    OrderProvider,
    ProductsProvider
  ]
})
export class AppModule {}
