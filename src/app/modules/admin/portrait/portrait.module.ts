import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortraitRoutingModule } from './portrait-routing.module';
import { PortraitComponent } from './pages/portrait.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [PortraitComponent],
  imports: [
    CommonModule,
    PortraitRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class PortraitModule {}
