import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenNewComponent } from './pages/token-new.component';

const routes: Routes = [{ path: '', component: TokenNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenNewRoutingModule {}
