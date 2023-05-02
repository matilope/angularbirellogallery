import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingUpdateRoutingModule } from './painting-update-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { PaintingUpdateComponent } from './painting-update.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { TokenInterceptorService } from 'src/app/services/ti.service';
import { PaintingsService } from 'src/app/services/paintings.service';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PaintingUpdateComponent],
  imports: [
    CommonModule,
    PaintingUpdateRoutingModule,
    FormsModule,
    AngularFileUploaderModule,
    SharedModule
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
export class PaintingUpdateModule {}
