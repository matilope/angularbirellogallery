import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousComponent } from './pages/miscellaneous.component';
import { TokenResolve } from '@shared/resolve/token.resolve';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    resolve: { token: TokenResolve },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TokenResolve],
})
export class MiscellaneousRoutingModule { }
