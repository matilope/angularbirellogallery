import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundpolicyRoutingModule } from './refundpolicy-routing.module';
import { RefundpolicyComponent } from './refundpolicy.component';

@NgModule({
  declarations: [RefundpolicyComponent],
  imports: [CommonModule, RefundpolicyRoutingModule],
})
export class RefundpolicyModule {}
