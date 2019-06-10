import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  public errorMsg : string;

  public searchInput : string;
  public requestList : Array<Object> = [];
  public friendsList : Array<Object> = [];
  public token : any;
  public user : any;

  public current : Object;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public request : RequestProvider,
    public loader : LoadingController,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

      let load = this.loader.create();
      load.present();
      this.token = localStorage.getItem('id_token');
      if (this.token){
          this.request.getCurrentUser({ token : this.token })
            .then(res => {
              let data = res.json();

              this.current = data.success;
              this.request.getUserFriends({ id : data.success['_id'] })
                .then(res => {
                  let data = res.json();

                  this.friendsList = data.success.friends;
                  this.requestList = data.success.requests;
                });
            })
            .catch(console.error)
            .then(() => {
              load.dismiss();
            });
          }
        }
        
  public search(){
    if (this.searchInput){
      let username = this.searchInput.trim();
      this.searchInput = "";
      if (username != this.current['username']){
        this.errorMsg = "";
        this.request.getUsersByName(username)
          .then(res => {
            let data = res.json();

            if (data.success){
              this.request.postFriendRequest({ receiver : data.success['_id'] ,current : this.current['_id']})
              .then(res => {
                let data = res.json();
  
                this.toastMessage(data.success || data.error);
              });
            } else {
              this.toastMessage(data.error);
            }
          })
          .catch(err => {
            console.error(err);
            this.toastMessage("Error while sending request: " + err);
          })
      } else {
        this.toastMessage("You cannot add yourself");
      }
    }
  }

  private acceptRequest(item) : void{
    this.request.acceptFriendRequest({current : this.current['_id'], id : item['_id']})
      .then(res => {
        let data = res.json();

        if (data.success){
          this.toastMessage("User successfully added");
          this.removeRequestItem(item);
          this.addFriendtItem(item);
        }
      });
  }
  
  private denyRequest(item) : void{
    this.request.deleteFriendRequest({ current : this.current['_id'], id : item['_id'] })
      .then(res => {
        let data = res.json();

        if (data.success){
          this.toastMessage("Request removed");
          this.removeRequestItem(item);
        }
      })
      .catch(console.error);
  }

  private deleteFriend(item) : void {
    const alert = this.alertCtrl.create({
      title: 'Delete friend ?',
      message: 'Are you sure you want to delete this friend ?',
      buttons: [
        {
          text : 'No'
        },
        {
          text : 'Yes',
          handler: () => {
            this.request.deleteFriend({current : this.current, receiver : item})
              .then(res => {
                let data = res.json();

                if (data.success){
                  this.toastMessage("Friend deleted");
                  this.removeFriendtItem(item);
                }
              })
          }
        }
      ]
    });
    alert.present();
  }

  private addRequestItem(item) : void{
    this.requestList.push(item);
  }
  
  private addFriendtItem(item) : void{
    this.friendsList.push(item);
  }
  
  private removeRequestItem(item) : void{
    let index = this.requestList.indexOf(item);
    if (index > -1){
      this.requestList.splice(index, 1);
    }
  }
  
  private removeFriendtItem(item) : void{
    let index = this.friendsList.indexOf(item);
    if (index > -1){
      this.friendsList.splice(index, 1);
    }
  }

  private toastMessage(message: string) : void {
    let toast = this.toastCtrl.create({
      message,
      duration : 3000
    });
    toast.present();
  }

  private getUserAvatar(id) {
    console.log(id);
    return this.request.getUserAvatar(id);
  }

}
