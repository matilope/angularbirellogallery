import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortraitRoutingModule } from './portrait-routing.module';
import { PortraitComponent } from './pages/portrait.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';

@NgModule({
  declarations: [PortraitComponent],
  imports: [
    CommonModule,
    PortraitRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    PortraitRoutingModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PortraitModule {}
