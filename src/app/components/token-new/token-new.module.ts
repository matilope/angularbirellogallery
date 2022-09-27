import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenNewRoutingModule } from './token-new-routing.module';
import { TokenNewComponent } from './token-new.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { TokenInterceptorService } from 'src/app/services/ti.service';

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
