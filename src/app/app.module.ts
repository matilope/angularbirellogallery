import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PaintingComponent } from './components/painting/painting.component';
import { HomeComponent } from './components/home/home.component';
import { MiscellaneousComponent } from './components/miscellaneous/miscellaneous.component';
import { PrivacypolicyComponent } from './components/privacypolicy/privacypolicy.component';
import { RefundpolicyComponent } from './components/refundpolicy/refundpolicy.component';
import { TermsofserviceComponent } from './components/termsofservice/termsofservice.component';
import { PaintingNewComponent } from './components/painting-new/painting-new.component';
import { PaintingUpdateComponent } from './components/painting-update/painting-update.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/ti.service';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ErrorComponent,
    AboutComponent,
    MiscellaneousComponent,
    ContactComponent,
    PaintingComponent,
    HomeComponent,
    PrivacypolicyComponent,
    RefundpolicyComponent,
    TermsofserviceComponent,
    PaintingNewComponent,
    PaintingUpdateComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule
  ],
  providers: [AuthService, AuthGuard, appRoutingProviders, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
