import { Component, OnDestroy, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Portrait } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Global } from '@global/global';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AdminComponent implements OnInit, OnDestroy {
  public portrait: Portrait;
  public paintings: Painting[];
  public token: Token;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;
  public subscription4: Subscription;
  public loaders: boolean[] = [];
  public isBrowser!: boolean;

  constructor(
    private _paintingsService: PaintingsService,
    private _portraitService: PortraitService,
    private _instagramService: InstagramService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.url = Global.url;
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.subscription = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.paintings.paints) {
          this.paintings = response.paintings.paints;
        }
      },
    });

    this.subscription2 = this._portraitService.getPortrait('64a4cb571625dd0281b55429').subscribe({
      next: response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        }
      },
    });

    this.subscription3 = this._instagramService.getToken('625b1c29ac7355062c33afe1').subscribe({
      next: response => {
        if (response.token) {
          this.token = response.token;
        }
      },
    });
  }

  delete(id: string, i: number): void {
    this.loaders[i] = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Painting is being deleted' });
    this.confirmationService.confirm({
      message: 'Are you certain you want to delete the painting?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscription4 = this._paintingsService.delete(id).subscribe({
          next: (response) => {
            if (response.status == 'Success') {
              this.loaders[i] = false;
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Painting was deleted' });
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  if ((isPlatformBrowser(this.platformId))) {
                    window.location.reload();
                  }
                });
              }, 1500);
            } else {
              this.loaders[i] = false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Painting deletion failed' });
            }
          },
          error: () => {
            this.loaders[i] = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Painting could not be deleted' });
          },
        });
      },
      reject: () => {
        this.loaders[i] = false;
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'Painting was not deleted' });
      }
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3, this.subscription4].forEach(e =>
      e?.unsubscribe()
    );
  }
}
