import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaintingsResolveService } from '@shared/resolve/paintingsresolve.service';
import { ContactComponent } from './pages/contact.component';

const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
    resolve: { paintings: PaintingsResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PaintingsResolveService],
})
export class ContactRoutingModule {}
