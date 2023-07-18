import { Component, Inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { User } from '@core/models/user';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnDestroy {
  public loginUserData: User;
  public subscription: Subscription;
  public loader: boolean = false;
  public isBrowser!: boolean;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private messageService: MessageService,
    private metaService: Meta
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loginUserData = {
      email: '',
      password: ''
    };
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  loginUser(form: HTMLFormElement): void {
    if (form.valid) {
      this.messageService.add({ severity: 'info', summary: 'Info', detail: 'You are logging in' });
      this.loader = true;
      this.subscription = this._auth.loginUser(this.loginUserData).subscribe({
        next: response => {
          if (response.status == 'Success') {
            localStorage.setItem(environment.token, response.token);
            this.loader = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The login credentials provided are correct' });
            setTimeout(() => {
              this._router.navigate(['/admin']);
            }, 1500);
          } else {
            this.loader = false;
            this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'The login credentials are not correct' });
          }
        },
        error: () => {
          this.loader = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User authentication failed, error code 404' });
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
