import { NgModule } from '@angular/core';
import { CardMapsComponent } from './card-maps/card-maps';
import { SidenavComponent } from './sidenav/sidenav';
@NgModule({
	declarations: [CardMapsComponent,
    SidenavComponent],
	imports: [],
	exports: [CardMapsComponent,
    SidenavComponent]
})
export class ComponentsModule {}
