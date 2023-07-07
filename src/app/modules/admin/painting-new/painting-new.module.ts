import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingNewRoutingModule } from './painting-new-routing.module';
import { PaintingNewComponent } from './pages/painting-new.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';

@NgModule({
  declarations: [PaintingNewComponent],
  imports: [
    CommonModule,
    PaintingNewRoutingModule,
    FormsModule
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
