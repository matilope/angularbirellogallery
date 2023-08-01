import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { PaintingUpdateRoutingModule } from './painting-update-routing.module';
import { PaintingUpdateComponent } from './pages/painting-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';

@NgModule({
  declarations: [PaintingUpdateComponent],
  imports: [
    NgIf,
    PaintingUpdateRoutingModule,
    ReactiveFormsModule,
    ImgBrokenDirective,
    InputTextModule,
    InputTextareaModule,
    ToastModule,
    ProgressSpinnerModule,
    ConfirmDialogModule
  ]
})
export class PaintingUpdateModule { }
