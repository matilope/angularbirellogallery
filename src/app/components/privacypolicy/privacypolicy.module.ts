import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacypolicyRoutingModule } from './privacypolicy-routing.module';
import { PrivacypolicyComponent } from './privacypolicy.component';

@NgModule({
  declarations: [PrivacypolicyComponent],
  imports: [CommonModule, PrivacypolicyRoutingModule],
})
export class PrivacypolicyModule {}
