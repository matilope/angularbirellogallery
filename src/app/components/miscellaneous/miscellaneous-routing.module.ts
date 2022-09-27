import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousComponent } from './miscellaneous.component';
import { TokenResolveService } from 'src/app/resolve/tokenresolve.service';

const routes: Routes = [
  {
    path: '',
    component: MiscellaneousComponent,
    resolve: { token: TokenResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [TokenResolveService],
})
export class MiscellaneousRoutingModule {}
