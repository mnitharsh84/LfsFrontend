import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx';
import { HTTP } from '@ionic-native/http/ngx';
// HttpClient module for RESTful API
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/component/user-management/_providers';
import { SharingModule } from 'src/app/shared/SharingModule';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, AppRoutingModule,HttpClientModule,  IonicModule.forRoot(), SharingModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    HTTP,

        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
