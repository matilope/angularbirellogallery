import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './pages/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [ContactComponent],
  imports: [NgIf, ContactRoutingModule, ReactiveFormsModule, InputTextModule, InputTextareaModule, DropdownModule, ToastModule, ProgressSpinnerModule]
})
export class ContactModule { }
