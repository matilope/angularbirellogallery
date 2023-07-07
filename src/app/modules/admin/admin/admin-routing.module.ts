import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsResolveService } from '@shared/resolve/paintingsresolve.service';
import { AdminComponent } from './pages/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    resolve: { paintings: PaintingsResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingsResolveService],
})
export class AdminRoutingModule {}
