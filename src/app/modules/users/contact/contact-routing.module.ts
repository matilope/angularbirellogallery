import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsResolve } from '@shared/resolve/paintings.resolve';
import { ContactComponent } from './pages/contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: { paintings: PaintingsResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule {}
