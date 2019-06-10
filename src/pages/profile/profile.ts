import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public current : Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public request: RequestProvider){

      let token = localStorage.getItem('id_token');
      this.request.getCurrentUser({ token })
        .then(res => {
          let data = res.json();

          if (data.success){
            this.current = data.success;
          }
        })
        .catch(console.error);
      
  }


}
