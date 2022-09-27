import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortadaRoutingModule } from './portada-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { PortadaComponent } from './portada.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from 'src/app/services/ti.service';

@NgModule({
  declarations: [PortadaComponent],
  imports: [
    CommonModule,
    PortadaRoutingModule,
    FormsModule,
    AngularFileUploaderModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    PortadaRoutingModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
})
export class PortadaModule {}
