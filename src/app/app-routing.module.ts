import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CustomPreloadStrategy } from '@core/strategies/custompreload.service';

const routes: Routes = [
  { path: '', pathMatch: "full", loadChildren: () => import('@modules/users/home/home.module').then(m => m.HomeModule), data: { preload: true } },
  { path: 'miscellaneous', loadChildren: () => import('@modules/users/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule), data: { preload: true } },
  { path: 'about', loadChildren: () => import('@modules/users/about/about.module').then(m => m.AboutModule), data: { preload: true } },
  { path: 'contact', loadChildren: () => import('@modules/users/contact/contact.module').then(m => m.ContactModule), data: { preload: true } },
  { path: 'painting/view/:id', loadChildren: () => import('@modules/users/painting/painting.module').then(m => m.PaintingModule) },
  { path: 'admin/create', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/painting-new/painting-new.module').then(m => m.PaintingNewModule) },
  { path: 'admin/update/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/painting-update/painting-update.module').then(m => m.PaintingUpdateModule) },
  { path: 'privacypolicy', loadChildren: () => import('@modules/users/privacypolicy/privacypolicy.module').then(m => m.PrivacypolicyModule) },
  { path: 'refundpolicy', loadChildren: () => import('@modules/users/refundpolicy/refundpolicy.module').then(m => m.RefundpolicyModule) },
  { path: 'termsofservice', loadChildren: () => import('@modules/users/termsofservice/termsofservice.module').then(m => m.TermsofserviceModule) },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin/show/users', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/users/users.module').then(m => m.AdminUsersModule) },
  { path: 'admin/login', loadChildren: () => import('@modules/users/login/login.module').then(m => m.LoginModule) },
  // { path: 'admin/register', loadChildren:()=>import('@modules/users/register/register.module').then(m=>m.RegisterModule) },
  { path: 'admin/change/portrait/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/portrait/portrait.module').then(m => m.PortraitModule) },
  // { path: 'admin/save/token', canActivate: [AuthGuard], loadChildren:()=>import('@modules/admin/token-new/token-new.module').then(m=>m.TokenNewModule) },
  { path: 'admin/change/token/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/token-update/token-update.module').then(m => m.TokenUpdateModule) },
  { path: '404', loadChildren: () => import('@modules/users/error/error.module').then(m => m.ErrorModule) },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadStrategy,
    })
  ],
  providers: [CustomPreloadStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule { }
