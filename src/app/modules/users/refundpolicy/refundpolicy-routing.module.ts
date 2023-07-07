import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefundpolicyComponent } from './pages/refundpolicy.component';

const routes: Routes = [{ path: '', component: RefundpolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RefundpolicyRoutingModule {}
