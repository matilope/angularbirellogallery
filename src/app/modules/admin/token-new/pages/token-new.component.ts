import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-token-new',
  templateUrl: './token-new.component.html',
  styleUrls: ['./token-new.component.scss'],
  providers: [MessageService]
})
export class TokenNewComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public token: Token;
  public url: string;
  public subscription: Subscription;
  public loader: boolean = false;
  public isBrowser!: boolean;

  constructor(
    private _instagramService: InstagramService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private messageService: MessageService,
    private metaService: Meta
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.url = Global.url;
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        token: new FormControl('', [
          Validators.required
        ])
      }
    );
  }

  onSubmit(): void {
    this.loader = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Token is being created' });
    this.subscription = this._instagramService
      .saveToken(this.token)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.token = response.token;
            this.loader = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Token was successfully created' });
            this._router.navigate(['/miscellaneous']);
          } else {
            this.loader = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token creation failed' });
          }
        },
        error: () => {
          this.loader = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token creation failed, error code 500' });
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
