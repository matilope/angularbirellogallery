import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenUpdateRoutingModule } from './token-update-routing.module';
import { TokenUpdateComponent } from './token-update.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { TokenInterceptorService } from 'src/app/services/ti.service';

@NgModule({
  declarations: [TokenUpdateComponent],
  imports: [CommonModule, TokenUpdateRoutingModule, FormsModule],
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
export class TokenUpdateModule {}
