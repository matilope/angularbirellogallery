import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousComponent } from './pages/miscellaneous.component';
import { TokenResolveService } from '@shared/resolve/tokenresolve.service';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    resolve: { tokens: TokenResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TokenResolveService],
})
export class MiscellaneousRoutingModule {}
