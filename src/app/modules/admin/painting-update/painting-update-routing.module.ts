import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolve } from '@shared/resolve/painting.resolve';
import { PaintingUpdateComponent } from './pages/painting-update.component';

const routes: Routes = [
  {
    path: '',
    component: PaintingUpdateComponent,
    resolve: { painting: PaintingResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaintingUpdateRoutingModule { }
