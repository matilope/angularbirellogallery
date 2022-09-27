import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormsModule } from '@angular/forms';
import { PaintingsService } from 'src/app/services/paintings.service';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ContactRoutingModule, FormsModule],
  providers:[PaintingsService]
})
export class ContactModule {}
