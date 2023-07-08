import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundpolicyRoutingModule } from './refundpolicy-routing.module';
import { RefundpolicyComponent } from './pages/refundpolicy.component';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [RefundpolicyComponent],
  imports: [CommonModule, RefundpolicyRoutingModule, AccordionModule],
})
export class RefundpolicyModule {}
