import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { RequestProvider } from '../../providers/request/request';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

@IonicPage()
@Component({
  selector: 'page-invite-popover',
  templateUrl: 'invite-popover.html',
})
export class InvitePopoverPage {

  private invite : Object;
  private isOwner : boolean = false;
  private current : Object;

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public request: RequestProvider,
    public toastCtrl: ToastController) {
      this.isOwner = this.navParams.data.owner;
      this.current = this.navParams.data.current;
      this.invite = this.navParams.data.invite;
  }

  public acceptInvite() : void {
    console.log("ACCEPT");
    this.request.acceptInvite({ id: this.invite['_id'], current : this.current['_id'] })
      .catch(console.error)
      .then(() => {
        this.closePopover();
      });
  }

  public denyInvite() : void {
    console.log("DENY");
    this.request.denyInvite({ id: this.invite['_id'], current : this.current['_id'] })
      .catch(console.error)
      .then(() => {
        this.closePopover();
      });
  }
  
  public deleteInvite() : void {
    let alert = this.alertCtrl.create({
      title: 'Delete friend ?',
      message: 'Are you sure you want to delete this invite ?',
      buttons: [
        {
          text : 'No'
        },
        {
          text : 'Yes',
          handler: () => {
            console.log("DELETE INVITE: " + this.invite['_id']);
            this.request.deleteInvite({ id: this.invite['_id']})
              .then(res => {
                let data = res.json();

                this.toastMessage(data.error || data.success);
              })
              .catch(console.error)
              .then(() => {
                this.appCtrl.getRootNav().pop();
              });
          }
        }
      ]
    });
    alert.present();
    this.closePopover();
  }

  public closePopover() : void {
    this.viewCtrl.dismiss();
  }

  public toastMessage(message : string) : void {
    let toast = this.toastCtrl.create({
      message,
      duration : 3000
    })
  }

}
