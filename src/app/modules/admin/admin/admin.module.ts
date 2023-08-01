import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';

@NgModule({
  declarations: [AdminComponent],
  imports: [NgFor, NgIf, AdminRoutingModule, ImgBrokenDirective, ToastModule, ConfirmDialogModule, ProgressSpinnerModule]
})
export class AdminModule { }
