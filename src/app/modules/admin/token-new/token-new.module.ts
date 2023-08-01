import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { TokenNewRoutingModule } from './token-new-routing.module';
import { TokenNewComponent } from './pages/token-new.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [TokenNewComponent],
  imports: [NgIf, TokenNewRoutingModule, ReactiveFormsModule, InputTextModule, ToastModule, ProgressSpinnerModule]
})
export class TokenNewModule {}
