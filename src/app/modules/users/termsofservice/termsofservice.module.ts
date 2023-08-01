import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { TermsofserviceRoutingModule } from './termsofservice-routing.module';
import { TermsofserviceComponent } from './pages/termsofservice.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [TermsofserviceComponent],
  imports: [NgFor, NgIf, TermsofserviceRoutingModule, AccordionModule, CardModule],
})
export class TermsofserviceModule {}
