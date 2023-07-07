import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './pages/miscellaneous.component';
import { InstagramService } from '@shared/services/instagram.service';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [MiscellaneousComponent],
  imports: [CommonModule, MiscellaneousRoutingModule, CardModule, ProgressSpinnerModule],
  providers: [InstagramService],
})
export class MiscellaneousModule {}
