import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { PaintingNewRoutingModule } from './painting-new-routing.module';
import { PaintingNewComponent } from './pages/painting-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [PaintingNewComponent],
  imports: [
    NgIf,
    PaintingNewRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    ProgressSpinnerModule
  ]
})
export class PaintingNewModule {}
