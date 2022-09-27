import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsofserviceRoutingModule } from './termsofservice-routing.module';
import { TermsofserviceComponent } from './termsofservice.component';

@NgModule({
  declarations: [TermsofserviceComponent],
  imports: [CommonModule, TermsofserviceRoutingModule],
})
export class TermsofserviceModule {}
