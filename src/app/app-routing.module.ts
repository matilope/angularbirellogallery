import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CustomPreloadStrategy } from './custompreload.service';

const routes: Routes = [
  { path: '', pathMatch: "full", loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule), data: { preload: true } },
  { path: 'miscellaneous', loadChildren: () => import('./components/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule), data: { preload: true } },
  { path: 'about', loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule), data: { preload: true } },
  { path: 'contact', loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule), data: { preload: true } },
  { path: 'painting/view/:id', loadChildren: () => import('./components/painting/painting.module').then(m => m.PaintingModule), data: { preload: true } },
  { path: 'admin/create', canActivate: [AuthGuard], loadChildren: () => import('./components/painting-new/painting-new.module').then(m => m.PaintingNewModule) },
  { path: 'admin/update/:id', canActivate: [AuthGuard], loadChildren: () => import('./components/painting-update/painting-update.module').then(m => m.PaintingUpdateModule) },
  { path: 'privacypolicy', loadChildren: () => import('./components/privacypolicy/privacypolicy.module').then(m => m.PrivacypolicyModule) },
  { path: 'refundpolicy', loadChildren: () => import('./components/refundpolicy/refundpolicy.module').then(m => m.RefundpolicyModule) },
  { path: 'termsofservice', loadChildren: () => import('./components/termsofservice/termsofservice.module').then(m => m.TermsofserviceModule) },
  { path: 'admin', canActivate: [AuthGuard], loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin/show/users', canActivate: [AuthGuard], loadChildren: () => import('./components/adminusers/adminusers.module').then(m => m.AdminUsersModule) },
  { path: 'admin/login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  // {path: "admin/register", loadChildren:()=>import('./components/register/register.module').then(m=>m.RegisterModule)},
  { path: 'admin/change/portada/:id', canActivate: [AuthGuard], loadChildren: () => import('./components/portada/portada.module').then(m => m.PortadaModule) },
  // {path: "admin/save/token", canActivate: [AuthGuard], loadChildren:()=>import('./components/token-new/token-new.module').then(m=>m.TokenNewModule)},
  { path: 'admin/change/token/:id', canActivate: [AuthGuard], loadChildren: () => import('./components/token-update/token-update.module').then(m => m.TokenUpdateModule) },
  { path: '404', loadChildren: () => import('./components/error/error.module').then(m => m.ErrorModule), data: { preload: true } },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: CustomPreloadStrategy,
    })
  ],
  providers: [CustomPreloadStrategy],
  exports: [RouterModule],
})
export class AppRoutingModule { }
