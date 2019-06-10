import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { RequestProvider } from '../../providers/request/request';

import { InviteSentPage } from '../invite-sent/invite-sent';
import { CreateInvitePage } from '../create-invite/create-invite';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { FriendsPage } from '../friends/friends';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private inviteType : string = "receive";
  private receive : Array<Object> = [];
  private sent : Array<Object> = [];

  private token : string;

  private current : Object;

  constructor(
    public navCtrl: NavController,
    public loader : LoadingController,
    public request : RequestProvider
  ) {}

  ionViewDidEnter() {
    let load = this.loader.create();
    load.present();

    this.getInvites()
      .catch(console.error)
      .then(() => {
        load.dismiss();
      });
  }

  public refreshInvites(refresher) {
    this.getInvites()
    .catch(console.error)
    .then(() => {
      refresher.complete();
    });
  }


  public getInvites() {
    return new Promise((resolve, reject) => {
      this.token = localStorage.getItem('id_token');
      if (this.token){
        this.request.getCurrentUser({ token : this.token })
          .then(res => {
            let data = res.json();

            this.current = data;
            this.request.getInvite({ id : data.success._id })
              .then(res => {
                let data = res.json();

                this.sent = data.success.sent;
                this.receive = data.success.receive;
                resolve();
              });
          })
          .catch(err => {
            console.error(err);
            reject("Error while getting current user");
          });
      } else {
        reject("No token");
      }
    });
  }

  public logout() : void {
    this.request.logout();
    this.setRootPage(LoginPage);
  }

  private setRootPage(page : any) : void{
    this.navCtrl.setRoot(page);
  }

  private createInvite() : void{
    this.request.getCurrentUser({ token : this.token })
      .then(res => {
        let data = res.json();

        this.request.getUserFriends({ id : data.success._id })
          .then(res => {
            let data = res.json();

            if (data && this.current){
              this.navCtrl.push(CreateInvitePage, {
                friends : data.success,
                current : this.current
              });
            }
          });
      })
      .catch(console.error);
  }


}
