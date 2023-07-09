import { Component, OnDestroy, OnInit } from '@angular/core';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Portrait } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Global } from '@global/global';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [PaintingsService, PortraitService, InstagramService, ConfirmationService, MessageService],
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

  constructor(
    private _paintingsService: PaintingsService,
    private _portraitService: PortraitService,
    private _instagramService: InstagramService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.url = Global.url;
    this.titleService.setTitle('Admin | Birello Gallery');
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
        if (response.portraits) {
          this.portrait = response.portraits;
        }
      },
    });

    this.subscription3 = this._instagramService.getToken('625b1c29ac7355062c33afe1').subscribe({
      next: response => {
        if (response.tokens) {
          this.token = response.tokens;
        }
      },
    });
  }

  delete(id: string): void {
    this.confirmationService.confirm({
      message: 'Are you certain you want to delete the painting?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscription4 = this._paintingsService.delete(id).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The painting was deleted' });
            setTimeout(() => {
              this._router.navigate(['/admin']).then(() => {
                window.location.reload();
              });
            }, 1500);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The painting could not be deleted' });
          },
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'The painting was not deleted' });
      }
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3, this.subscription4].forEach(e =>
      e?.unsubscribe()
    );
  }
}
