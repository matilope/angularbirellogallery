import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { PaintingsService } from '@shared/services/paintings.service';
import { SharedModule } from '@shared/shared.module';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule, CardModule, ButtonModule, ProgressSpinnerModule],
  providers: [PaintingsService]
})
export class HomeModule { }
