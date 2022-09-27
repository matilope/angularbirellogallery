import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolveService } from 'src/app/resolve/paintingresolve.service';
import { PaintingComponent } from './painting.component';

const routes: Routes = [
  {
    path: '',
    component: PaintingComponent,
    resolve: { painting: PaintingResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingResolveService],
})
export class PaintingRoutingModule {}
