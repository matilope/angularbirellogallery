import { ModuleWithProviders} from "@angular/core";
import { Routes, RouterModule} from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { MiscellaneousComponent } from "./components/miscellaneous/miscellaneous.component";
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { PaintingComponent } from "./components/painting/painting.component";
import { ErrorComponent } from "./components/error/error.component";
import { PrivacypolicyComponent } from "./components/privacypolicy/privacypolicy.component";
import { RefundpolicyComponent } from "./components/refundpolicy/refundpolicy.component";
import { TermsofserviceComponent } from "./components/termsofservice/termsofservice.component";

import { PaintingNewComponent } from "./components/painting-new/painting-new.component";
import { PaintingUpdateComponent } from "./components/painting-update/painting-update.component";

import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component';
import { AdminregisterComponent } from './components/adminregister/adminregister.component';
import { PortadaComponent } from './components/portada/portada.component';

import { AuthGuard } from './auth.guard';


// Array de rutas

const appRoutes : Routes = [
    {path: "", component: HomeComponent},
    {path: "miscellaneous", component: MiscellaneousComponent},
    {path: "about", component: AboutComponent},
    {path: "contact", component: ContactComponent},
    {path: "painting/view/:id", component: PaintingComponent},
    {path: "admin/create", canActivate: [AuthGuard], component: PaintingNewComponent},
    {path: "admin/update/:id", canActivate: [AuthGuard], component: PaintingUpdateComponent},
    {path: "privacypolicy", component: PrivacypolicyComponent},
    {path: "refundpolicy", component: RefundpolicyComponent},
    {path: "termsofservice", component: TermsofserviceComponent},
    {path: "admin", canActivate: [AuthGuard], component: AdminComponent},
    {path: "admin/show/users", canActivate: [AuthGuard], component: AdminregisterComponent},
    {path: "admin/login", component: LoginComponent},
    {path: "admin/register", canActivate: [AuthGuard], component: RegisterComponent},
    {path: "admin/change/portada/:id", canActivate: [AuthGuard], component: PortadaComponent},
    {path: '404', component: ErrorComponent},
    {path: '**', redirectTo: '/404'}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled'
});