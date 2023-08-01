import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { PaintingRoutingModule } from './painting-routing.module';
import { PaintingComponent } from './pages/painting.component';
import { AccordionModule } from 'primeng/accordion';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';

@NgModule({
  declarations: [PaintingComponent],
  imports: [NgIf, PaintingRoutingModule, ImgBrokenDirective, AccordionModule]
})
export class PaintingModule { }
