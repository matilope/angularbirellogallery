import { NgModule } from '@angular/core';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './pages/error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [ErrorRoutingModule],
})
export class ErrorModule {}
