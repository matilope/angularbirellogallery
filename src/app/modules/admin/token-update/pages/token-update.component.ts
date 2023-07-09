import { Component, OnDestroy, OnInit } from '@angular/core';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-token-update',
  templateUrl: './token-update.component.html',
  styleUrls: ['./token-update.component.scss'],
  providers: [InstagramService, MessageService],
})
export class TokenUpdateComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  public token: Token;
  private tokenId!: string;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;

  constructor(
    private _instagramService: InstagramService,
    private _route: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Refresh Instagram's token");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.subscription2 = this._route.params.subscribe(params => {
      this.tokenId = params['id'];
      this.subscription3 = this._instagramService
        .getToken(this.tokenId)
        .subscribe(response => {
          if (response.tokens) {
            this.token = response.tokens.token;
            this.formData = new FormGroup(
              {
                token: new FormControl(this.token, [
                  Validators.required
                ])
              }
            );
          }
        });
    });
  }

  onSubmit(): void {
    const { token } = this.formData.value;
    this.subscription = this._instagramService
      .updateToken(this.tokenId, token)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.token = response.token;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Token was successfully updated' });
            setTimeout(() => {
              this._router.navigate(['/miscellaneous']);
            }, 1500);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token update failed' });
            setTimeout(() => {
              this._router.navigate(['/admin']);
            }, 1500);
          }
        }
      });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
