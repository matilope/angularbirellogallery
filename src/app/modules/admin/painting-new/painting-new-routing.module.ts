import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingNewComponent } from './pages/painting-new.component';

const routes: Routes = [{ path: '', component: PaintingNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintingNewRoutingModule {}
