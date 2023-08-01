import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './pages/about.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [AboutComponent],
  imports: [AboutRoutingModule, CarouselModule]
})
export class AboutModule { }
