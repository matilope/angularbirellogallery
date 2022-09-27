import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminusersComponent } from './adminusers.component';

const routes: Routes = [{ path: '', component: AdminusersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminusersRoutingModule {}
