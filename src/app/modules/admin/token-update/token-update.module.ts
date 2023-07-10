import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TokenUpdateRoutingModule } from './token-update-routing.module';
import { TokenUpdateComponent } from './pages/token-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [TokenUpdateComponent],
  imports: [CommonModule, TokenUpdateRoutingModule, ReactiveFormsModule, InputTextModule, ToastModule, ProgressSpinnerModule],
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
export class TokenUpdateModule { }
