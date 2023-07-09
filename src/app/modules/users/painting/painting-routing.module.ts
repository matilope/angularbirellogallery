import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolveService } from '@shared/resolve/paintingresolve.service';
import { PaintingComponent } from './pages/painting.component';

const routes: Routes = [
  {
    path: '',
    component: PaintingComponent,
    resolve: { painting: PaintingResolveService }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingResolveService],
})
export class PaintingRoutingModule {}
