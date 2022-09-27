import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminusersRoutingModule } from './adminusers-routing.module';
import { AdminusersComponent } from './adminusers.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { TokenInterceptorService } from 'src/app/services/ti.service';

@NgModule({
  declarations: [AdminusersComponent],
  imports: [CommonModule, AdminusersRoutingModule],
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
export class AdminUsersModule {}
