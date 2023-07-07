import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacypolicyRoutingModule } from './privacypolicy-routing.module';
import { PrivacypolicyComponent } from './pages/privacypolicy.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [PrivacypolicyComponent],
  imports: [CommonModule, PrivacypolicyRoutingModule, AccordionModule, CardModule],
})
export class PrivacypolicyModule {}
