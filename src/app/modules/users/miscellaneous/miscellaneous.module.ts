import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousComponent } from './pages/miscellaneous.component';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [MiscellaneousComponent],
  imports: [NgFor, NgIf, MiscellaneousRoutingModule, CardModule, ProgressSpinnerModule]
})
export class MiscellaneousModule {}
