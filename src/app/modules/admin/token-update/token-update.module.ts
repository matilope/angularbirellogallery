import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { TokenUpdateRoutingModule } from './token-update-routing.module';
import { TokenUpdateComponent } from './pages/token-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [TokenUpdateComponent],
  imports: [NgIf, TokenUpdateRoutingModule, ReactiveFormsModule, InputTextModule, ToastModule, ProgressSpinnerModule]
})
export class TokenUpdateModule { }
