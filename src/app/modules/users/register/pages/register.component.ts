import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { User } from '@core/models/user';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent implements OnDestroy {
  public registerUserData: User;
  public subscription: Subscription;
  public loader: boolean = false;
  public isBrowser!: boolean;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: object,
    private messageService: MessageService,
    private metaService: Meta
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.registerUserData = {
      email: '',
      password: ''
    };
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  registerUser(form: NgForm): void {
    if (form.valid) {
      this.loader = true;
      this.subscription = this._auth
        .registerUser(this.registerUserData)
        .subscribe({
          next: response => {
            if (response.status == 'Success') {
              this.loader = false;
              this.cookieService.set(environment.token, response.token, 14, "/", "", true, 'Strict');
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User was successfully created' });
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  if ((isPlatformBrowser(this.platformId))) {
                    window.location.reload();
                  }
                });
              }, 1500);
            } else {
              this.loader = false;
              this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'User creation failed' });
            }
          },
          error: () => {
            this.loader = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User creation failed, error code 500' });
          }
        });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'All fields are required' });
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
