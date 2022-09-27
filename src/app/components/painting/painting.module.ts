import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingRoutingModule } from './painting-routing.module';
import { PaintingComponent } from './painting.component';
import { PaintingsService } from 'src/app/services/paintings.service';

@NgModule({
  declarations: [PaintingComponent],
  imports: [CommonModule, PaintingRoutingModule],
  providers:[PaintingsService]
})
export class PaintingModule {}
