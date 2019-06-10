import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InviteSentPage } from './invite-sent';

@NgModule({
  declarations: [
    InviteSentPage,
  ],
  imports: [
    IonicPageModule.forChild(InviteSentPage),
  ],
})
export class InviteSentPageModule {}
