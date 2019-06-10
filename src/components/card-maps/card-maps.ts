import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";

import { RequestProvider } from '../../providers/request/request';
import { InvitePage } from '../../pages/invite/invite';
import * as moment from 'moment';

@Component({
  selector: 'card-maps',
  templateUrl: 'card-maps.html'
})
export class CardMapsComponent {

  @Input() data : Object;
  text: string;

  constructor(
    private navCtrl : NavController,
    private request : RequestProvider) {
    }


  
  public getMap(lng = 0, lat = 0) : string {
    return "https://maps.googleapis.com/maps/api/staticmap?center="+lng+","+lat+"&zoom=20&size=1000x300&scale=2&maptype=roadmap&key=AIzaSyD319Xgu3gnMryNSI7L5XR59sU8atnZuqU"
  }

  public getTimeFrom(date : Date) : string {
    let newDate = new Date(date);
    return moment(newDate).fromNow();
  }

  public getTimeHours(date : Date) : string {
    return moment(date).format('hh:mm a');
  }

  public showInvite(data? : Object) : void{
    this.navCtrl.push(InvitePage, data);
  }

}


