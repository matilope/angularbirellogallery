import { Component, OnDestroy, OnInit } from '@angular/core';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-token-new',
  templateUrl: './token-new.component.html',
  styleUrls: ['./token-new.component.scss'],
  providers: [InstagramService, MessageService]
})
export class TokenNewComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public token: Token;
  public url: string;
  public suscripcion: Subscription;
  public loader: boolean = false;

  constructor(
    private _instagramService: InstagramService,
    private _router: Router,
    private messageService: MessageService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Create new Instagram token");
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
    this.suscripcion = this._instagramService
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
    this.suscripcion?.unsubscribe();
  }
}
