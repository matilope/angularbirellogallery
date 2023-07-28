import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { CustomPreloadStrategy } from '@core/strategies/custompreload.service';

const routes: Routes = [
  { path: '', pathMatch: "full", loadChildren: () => import('@modules/users/home/home.module').then(m => m.HomeModule), title: 'Artworks', data: { preload: true } },
  { path: 'miscellaneous', loadChildren: () => import('@modules/users/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule), title: 'Miscellaneous', data: { preload: true } },
  { path: 'about', loadChildren: () => import('@modules/users/about/about.module').then(m => m.AboutModule), title: 'About' },
  { path: 'contact', loadChildren: () => import('@modules/users/contact/contact.module').then(m => m.ContactModule), title: 'Contact' },
  { path: 'painting/view/:id', loadChildren: () => import('@modules/users/painting/painting.module').then(m => m.PaintingModule), data: { preload: true } },
  { path: 'admin/create', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/painting-new/painting-new.module').then(m => m.PaintingNewModule), title: 'Create New Painting' },
  { path: 'admin/update/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/painting-update/painting-update.module').then(m => m.PaintingUpdateModule), title: 'Update Painting' },
  { path: 'privacypolicy', loadChildren: () => import('@modules/users/privacypolicy/privacypolicy.module').then(m => m.PrivacypolicyModule), title: 'Privacy Policy' },
  { path: 'refundpolicy', loadChildren: () => import('@modules/users/refundpolicy/refundpolicy.module').then(m => m.RefundpolicyModule), title: 'Refund Policy' },
  { path: 'termsofservice', loadChildren: () => import('@modules/users/termsofservice/termsofservice.module').then(m => m.TermsofserviceModule), title: 'Terms Of Service' },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/admin/admin.module').then(m => m.AdminModule), title: 'Administration Panel' },
  { path: 'admin/show/users', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/users/users.module').then(m => m.AdminUsersModule), title: 'Registered Users' },
  { path: 'admin/login', loadChildren: () => import('@modules/users/login/login.module').then(m => m.LoginModule), title: 'Log in' },
  // { path: 'admin/register', loadChildren:()=>import('@modules/users/register/register.module').then(m=>m.RegisterModule), title: 'Register' },
  { path: 'admin/change/portrait/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/portrait/portrait.module').then(m => m.PortraitModule), title: 'Change Portrait' },
  // { path: 'admin/save/token', canActivate: [AuthGuard], loadChildren:()=>import('@modules/admin/token-new/token-new.module').then(m=>m.TokenNewModule), title: 'Create New Instagram Token' },
  { path: 'admin/change/token/:id', canActivate: [AuthGuard], loadChildren: () => import('@modules/admin/token-update/token-update.module').then(m => m.TokenUpdateModule), title: `Refresh Instagram's Token` },
  { path: '404', loadChildren: () => import('@modules/users/error/error.module').then(m => m.ErrorModule), title: 'Page not found' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadStrategy,
      scrollPositionRestoration: 'enabled'
    })
  ],
  providers: [CustomPreloadStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule { }
