import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsResolve } from '@shared/resolve/paintings.resolve';
import { AdminComponent } from './pages/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    resolve: { paintings: PaintingsResolve }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
