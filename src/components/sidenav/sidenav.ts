import { Component } from '@angular/core';

@Component({
  selector: 'sidenav',
  templateUrl: 'sidenav.html'
})
export class SidenavComponent {

  private menuItem : Array<Object>;

  constructor() {

    this.menuItem = [
      { label : 'Profile', icon : 'person'},
      { label : 'Notification', icon : 'notifications'},
      { label : 'Friends', icon : 'people'},
      { label : 'Logout', icon : 'log-out'}
    ];
  }

}
