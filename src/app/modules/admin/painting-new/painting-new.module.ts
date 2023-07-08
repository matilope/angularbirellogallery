import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingNewRoutingModule } from './painting-new-routing.module';
import { PaintingNewComponent } from './pages/painting-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [PaintingNewComponent],
  imports: [
    CommonModule,
    PaintingNewRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PaintingNewModule {}
