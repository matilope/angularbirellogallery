import { NgModule } from '@angular/core';

import { RefundpolicyRoutingModule } from './refundpolicy-routing.module';
import { RefundpolicyComponent } from './pages/refundpolicy.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [RefundpolicyComponent],
  imports: [RefundpolicyRoutingModule, AccordionModule],
})
export class RefundpolicyModule {}
