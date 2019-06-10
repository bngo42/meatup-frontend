import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';
import { MapsAPILoader } from '@agm/core';
import * as moment from 'moment';
import { RequestProvider } from '../../providers/request/request';

@IonicPage()
@Component({
  selector: 'page-create-invite',
  templateUrl: 'create-invite.html',
})

export class CreateInvitePage {
  @ViewChild('searchMaps', {read: ElementRef}) searchBar: ElementRef;
  @ViewChild('gMap', {read: ElementRef}) gmap: ElementRef;
  @ViewChild(Slides) slides: Slides;

  public map : any;
  public place : any;
  public searchbox : any;

  public latitude = 48.864716;
  public longitude = 2.349014;
  public zoom = 10;
  public markerPlaced : boolean = false;

  public data: any;
  public current : Object;
  public friendsList : Array<Object> = [];

  public title : string;
  public invitedList: Array<string> = [];
  public datePicked : any;

  public slideIndex : Number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiLoader : MapsAPILoader,
    public request : RequestProvider,
    public toastCtrl : ToastController){
    }
    
    
  ngOnInit() {
    this.friendsList = this.navParams.data.friends;
    this.data = this.navParams.data.current;
    let mapElement = this.gmap.nativeElement;
    let searchElement = this.searchBar.nativeElement.querySelector('input');
    this.slides.lockSwipes(true);
    
    this.apiLoader.load()
    .then(() => {
      this.map = new google.maps.Map(mapElement,{
        center: {lat: this.latitude, lng: this.longitude},
        zoom : this.zoom
      })
      
      let marker = new google.maps.Marker({
        position : {lat : this.latitude, lng: this.longitude},
        map : this.map,
        anchorPoint: new google.maps.Point(0, -29)
      });
      marker.setVisible(false);
      
      this.searchbox = new google.maps.places.Autocomplete(searchElement);
      this.searchbox.setComponentRestrictions({'country': ['fr']});
      
      this.searchbox.addListener("place_changed", () => {
        marker.setVisible(false);
        this.place = this.searchbox.getPlace();
        if (this.place.geometry) {
          marker.setPosition(this.place.geometry.location);
          this.map.setCenter(this.place.geometry.location);
          this.map.setZoom(18);
          marker.setVisible(true);
          this.markerPlaced = true;
        } else {
          this.markerPlaced = false;
        }
      });      
    });
  }

  public navBack(){
    if (this.slides.getActiveIndex() > 0){
      this.prev();
    } else {
      this.navCtrl.pop();
    }
  }

  public prev() : void {
    this.slides.lockSwipes(false);
    this.slides.slideTo(this.slides.getActiveIndex() - 1);
    this.slides.lockSwipes(true);
  }

  public next() : void {
    this.slides.lockSwipes(false);    
    this.slides.slideTo(this.slides.getActiveIndex() + 1);
    this.slides.lockSwipes(true);
  }

  private sendInvite() : void {
    let promiseArr : Array<any>  = [];
    let users : Array<Object> = []

    this.invitedList.forEach(userId => {
      promiseArr.push(this.request.getUsersById(userId));
    });

    Promise.all(promiseArr)
      .then(item => {

        item.forEach(res => {
          let data = res.json();
          users.push(data.success);
        });
      })
      .then(() => {
        
        let location = this.searchbox.getPlace();
        let invite = {
                "creator" : this.data.success,
                "title" : this.title,
                "datetime" : moment(this.datePicked).format("HH:mm").toString(),
                "location" : {
                  "address" : location.formatted_address,
                  "latitude" : location.geometry.location.lat(),
                  "longitude" : location.geometry.location.lng()
                },
                "date_creation" : moment().format("YYYY-MM-DD HH:mm:ss").toString(),
                "invited" : users
              };
        this.request.postInvite({ invite })
          .then(res => {
            let data = res.json();
            let toast = this.toastCtrl.create({
              message: data.error || data.success,
              duration: 3000
            })
            toast.present();
          })
      })
      .catch(console.error)
      .then(() => {
        this.navCtrl.pop();
      });
  }

  public updateSlideIndex() : void {
    this.slideIndex = this.slides.getActiveIndex();
    console.log(this.slideIndex);
  }

  private getCurrentSlide() : Number {
    return this.slides.getActiveIndex();
  }

  private getCurrentDate() : string {
    return moment().format('YYYY-MM-DD').toString();
  }

  private formatDate(date) : string {
    return moment(date).format('YYYY-MM-DD hh:mm').toString();
  }
  
  private toggleUser(user) : void{
    let index = this.invitedList.indexOf(user);

    if (index >= 0){
      this.invitedList.splice(index, 1);
    } else {
      this.invitedList.push(user);
    }
  }
}
