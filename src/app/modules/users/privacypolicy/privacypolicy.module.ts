import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { PrivacypolicyRoutingModule } from './privacypolicy-routing.module';
import { PrivacypolicyComponent } from './pages/privacypolicy.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [PrivacypolicyComponent],
  imports: [NgFor, NgIf, PrivacypolicyRoutingModule, AccordionModule, CardModule],
})
export class PrivacypolicyModule {}
