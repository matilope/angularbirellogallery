import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './pages/about.component';
import { CarouselModule } from 'primeng/carousel';

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, AboutRoutingModule, CarouselModule]
})
export class AboutModule { }
