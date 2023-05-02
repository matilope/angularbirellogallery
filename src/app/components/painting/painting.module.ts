import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingRoutingModule } from './painting-routing.module';
import { PaintingComponent } from './painting.component';
import { PaintingsService } from 'src/app/services/paintings.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaintingComponent],
  imports: [CommonModule, PaintingRoutingModule, SharedModule],
  providers: [PaintingsService]
})
export class PaintingModule { }
