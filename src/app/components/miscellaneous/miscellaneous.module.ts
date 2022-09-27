import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './miscellaneous.component';
import { InstagramService } from '../../services/instagram.service';

@NgModule({
  declarations: [MiscellaneousComponent],
  imports: [CommonModule, MiscellaneousRoutingModule],
  providers: [InstagramService],
})
export class MiscellaneousModule {}
