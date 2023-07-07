import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsofserviceRoutingModule } from './termsofservice-routing.module';
import { TermsofserviceComponent } from './pages/termsofservice.component';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [TermsofserviceComponent],
  imports: [CommonModule, TermsofserviceRoutingModule, AccordionModule, CardModule],
})
export class TermsofserviceModule {}
