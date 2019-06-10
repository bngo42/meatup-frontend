import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateInvitePage } from './create-invite';

@NgModule({
  declarations: [
    CreateInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateInvitePage),
  ],
})
export class CreateInvitePageModule {}
