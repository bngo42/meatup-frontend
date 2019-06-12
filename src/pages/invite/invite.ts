import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { RequestProvider } from '../../providers/request/request';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

import { InvitePopoverPage } from '../invite-popover/invite-popover';


@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {
  @ViewChild('gMap', {read: ElementRef}) gmap: ElementRef;

  private isOwner : boolean = false;
  private current : Object;

  private data : Object;
  private map : any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loader: LoadingController,
    public apiLoader : MapsAPILoader,
    public request: RequestProvider,
    public popCtrl: PopoverController,
    public toastCtrl: ToastController) {

    let load = this.loader.create();
    load.present();

    this.data = this.navParams.data;
    this.apiLoader.load()
    .then(() => {
      this.map = new google.maps.Map(this.gmap.nativeElement,{
        center: {lat: this.data['location'].latitude, lng: this.data['location'].longitude},
        zoom: 20,
        disableDefaultUI: true
      });

      let marker = new google.maps.Marker({
        position : {lat : this.data['location'].latitude, lng: this.data['location'].longitude},
        map : this.map,
        anchorPoint: new google.maps.Point(0, -29)
      });
    });

    let token = localStorage.getItem('id_token');
    this.request.getCurrentUser({ token })
      .then(res => {
        let data = res.json();

        if (data.success){
          let user = data.success;

          this.current = user;
          if (user['_id'] == this.data['creator']['_id']){
            this.isOwner = true;
          }
        }
      })
      .catch(console.error)
      .then(() => {
        load.dismiss();
      });

  }


  public getTimeFrom(date : Date) : string {
    let newDate = new Date(date);
    return moment(newDate).fromNow();
  }

  public getTimeHours(date : Date) : string {
    return moment(date).format('hh:mm a');
  }

  public acceptInvite() : void {
    if (this.current){
      this.request.acceptInvite({ id: this.data['_id'], current : this.current['_id'] })
        .then(res => {
          let data = res.json();

          this.toastMessage(data.success || data.error);
        })
        .catch(console.error);
    }
  }
  
  public denyInvite() : void {
    if (this.current){
      this.request.denyInvite({ id: this.data['_id'], current : this.current['_id'] })
        .then(res => {
          let data = res.json();

          this.toastMessage(data.success || data.error);
        })
        .catch(console.error);
    }
  }

  public displayPopOver(myEvent) : void {
    let popover = this.popCtrl.create(InvitePopoverPage, {
      current : this.current,
      owner : this.isOwner,
      invite : this.data
    });
    popover.present({
      ev: myEvent
    });
  }
  
  public toastMessage(message : string) : void {
    let toast = this.toastCtrl.create({
      message,
      duration : 3000
    })
    toast.present();
  }

}
