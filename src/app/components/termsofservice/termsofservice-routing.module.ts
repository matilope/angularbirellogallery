import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsofserviceComponent } from './termsofservice.component';

const routes: Routes = [{ path: '', component: TermsofserviceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsofserviceRoutingModule {}
