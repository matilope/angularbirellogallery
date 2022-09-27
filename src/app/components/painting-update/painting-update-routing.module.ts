import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingResolveService } from 'src/app/resolve/paintingresolve.service';
import { PaintingUpdateComponent } from './painting-update.component';

const routes: Routes = [
  {
    path: '',
    component: PaintingUpdateComponent,
    resolve: { painting: PaintingResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingResolveService],
})
export class PaintingUpdateRoutingModule {}
