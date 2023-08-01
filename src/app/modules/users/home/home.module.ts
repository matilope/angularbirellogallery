import { NgModule } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ImgBrokenDirective } from '@shared/directives/img-broken.directive';

@NgModule({
  declarations: [HomeComponent],
  imports: [NgFor, NgIf, HomeRoutingModule, ImgBrokenDirective, ProgressSpinnerModule, FormsModule, InputTextModule, ToastModule]
})
export class HomeModule { }
