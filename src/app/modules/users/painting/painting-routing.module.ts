import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolve } from '@shared/resolve/painting.resolve';
import { PaintingComponent } from './pages/painting.component';

const routes: Routes = [
  {
    path: '',
    component: PaintingComponent,
    resolve: { painting: PaintingResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingResolve],
})
export class PaintingRoutingModule { }
