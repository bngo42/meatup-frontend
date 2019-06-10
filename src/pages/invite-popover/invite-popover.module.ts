import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitePopoverPage } from './invite-popover';

@NgModule({
  declarations: [
    InvitePopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitePopoverPage),
  ],
})
export class InvitePopoverPageModule {}
