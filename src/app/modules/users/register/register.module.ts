import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './pages/register.component';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [RegisterComponent],
  imports: [NgIf, RegisterRoutingModule, FormsModule, ProgressSpinnerModule, ToastModule, InputTextModule, PasswordModule],
})
export class RegisterModule {}
