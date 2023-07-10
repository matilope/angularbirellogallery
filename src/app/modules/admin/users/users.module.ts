import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminusersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from '@shared/services/auth.service';
import { AuthGuard } from '@core/guards/auth.guard';
import { TokenInterceptorService } from '@core/interceptors/interceptor.service';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, AdminusersRoutingModule, ToastModule, ConfirmDialogModule, ProgressSpinnerModule],
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
export class AdminUsersModule { }
