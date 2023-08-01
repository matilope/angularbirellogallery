import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { AdminusersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [UsersComponent],
  imports: [NgFor, NgIf, AdminusersRoutingModule, ToastModule, ConfirmDialogModule, ProgressSpinnerModule]
})
export class AdminUsersModule { }
