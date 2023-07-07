import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortraitComponent } from './pages/portrait.component';

const routes: Routes = [{ path: '', component: PortraitComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortraitRoutingModule {}
