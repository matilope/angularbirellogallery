import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TokenUpdateComponent } from './pages/token-update.component';

const routes: Routes = [{ path: '', component: TokenUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TokenUpdateRoutingModule {}
