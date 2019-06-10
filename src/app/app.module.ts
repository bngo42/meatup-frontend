import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InviteSentPage } from '../pages/invite-sent/invite-sent';
import { InvitePage } from '../pages/invite/invite';
import { CreateInvitePage } from '../pages/create-invite/create-invite';
import { ProfilePage } from '../pages/profile/profile';
import { FriendsPage } from '../pages/friends/friends';

import { CardMapsComponent } from '../components/card-maps/card-maps';
import { SidenavComponent } from '../components/sidenav/sidenav';
import { RequestProvider } from '../providers/request/request';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { InvitePopoverPage } from '../pages/invite-popover/invite-popover';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    InviteSentPage,
    InvitePage,
    ProfilePage,
    FriendsPage,
    CreateInvitePage,
    InvitePopoverPage,
    CardMapsComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD319Xgu3gnMryNSI7L5XR59sU8atnZuqU',
      libraries: ['places']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    InviteSentPage,
    InvitePage,
    ProfilePage,
    FriendsPage,
    CreateInvitePage,
    InvitePopoverPage,
    CardMapsComponent,
    SidenavComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RequestProvider
  ]
})
export class AppModule {}
