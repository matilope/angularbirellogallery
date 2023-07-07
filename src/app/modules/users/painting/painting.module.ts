import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingRoutingModule } from './painting-routing.module';
import { PaintingComponent } from './pages/painting.component';
import { PaintingsService } from '@shared/services/paintings.service';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [PaintingComponent],
  imports: [CommonModule, PaintingRoutingModule, SharedModule],
  providers: [PaintingsService]
})
export class PaintingModule { }
