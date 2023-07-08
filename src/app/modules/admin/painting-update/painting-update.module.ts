import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingUpdateRoutingModule } from './painting-update-routing.module';
import { PaintingUpdateComponent } from './pages/painting-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';
import { PaintingsService } from '@shared/services/paintings.service';
import { SharedModule } from '@shared/shared.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [PaintingUpdateComponent],
  imports: [
    CommonModule,
    PaintingUpdateRoutingModule,
    ReactiveFormsModule,
    SharedModule,
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
    PaintingsService
  ],
})
export class PaintingUpdateModule { }
