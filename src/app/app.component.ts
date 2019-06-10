import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RequestProvider } from '../providers/request/request';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = LoginPage;

  public menuItem : Array<Object>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public request : RequestProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.menuItem = [
      { label : 'Invite', icon : 'mail'},
      { label : 'Profile', icon : 'person'},
      { label : 'Friends', icon : 'people'},
      { label : 'Logout', icon : 'log-out'}
    ];
  }

  public exec(fn : string) {
    switch (fn.toLowerCase()){
      case 'profile':
        this.nav.setRoot(ProfilePage);
        break ;
      case 'invite':
        this.nav.setRoot(HomePage);
        break ;
      case 'friends':
        this.nav.setRoot(FriendsPage);
        break ;
      case 'logout':
        this.logout();
        break ;
    }
  }

  public logout() : void {
    this.request.logout();
    this.nav.setRoot(LoginPage);
  }
}

