import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './pages/login.component';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [LoginComponent],
  imports: [NgIf, LoginRoutingModule, FormsModule, ProgressSpinnerModule, ToastModule, InputTextModule, PasswordModule]
})
export class LoginModule { }
