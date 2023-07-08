import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './pages/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaintingsService } from '@shared/services/paintings.service';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRoutingModule, ReactiveFormsModule, InputTextModule, InputTextareaModule, DropdownModule],
  providers: [PaintingsService]
})
export class ContactModule { }