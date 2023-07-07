import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenNewRoutingModule } from './token-new-routing.module';
import { TokenNewComponent } from './pages/token-new.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';

@NgModule({
  declarations: [TokenNewComponent],
  imports: [CommonModule, TokenNewRoutingModule, FormsModule],
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
export class TokenNewModule {}
