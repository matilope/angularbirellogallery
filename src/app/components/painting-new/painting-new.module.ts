import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaintingNewRoutingModule } from './painting-new-routing.module';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { PaintingNewComponent } from './painting-new.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { AuthGuard } from 'src/app/auth.guard';
import { TokenInterceptorService } from 'src/app/services/ti.service';

@NgModule({
  declarations: [PaintingNewComponent],
  imports: [
    CommonModule,
    PaintingNewRoutingModule,
    FormsModule,
    AngularFileUploaderModule,
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
