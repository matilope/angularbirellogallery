import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Portrait } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global//global';
import { Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.scss'],
  providers: [MessageService]
})

export class PortraitComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public portrait: Portrait;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;
  public selectedFile: File | null = null;
  public loader: boolean = false;
  public isBrowser!: boolean;

  constructor(
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: object,
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
    this.subscription2 = this._route.params.subscribe(params => {
      let portraitId = params['id'];
      this.subscription3 = this._portraitService
        .getPortrait(portraitId)
        .subscribe({
          next: response => {
            if (response.portrait) {
              this.portrait = response.portrait;
              this.formGroup = new FormGroup(
                {
                  title: new FormControl(this.portrait.title, [
                    Validators.required
                  ]),
                  image0url: new FormControl(null)
                }
              );
            }
          },
        });
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    this.loader = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Portrait is being uploaded' });
    const { title, image0url } = this.formGroup.value;
    const formData = new FormData();
    formData.append('title', title);
    if (image0url === null) {
      formData.append('image0url', this.portrait.image0url);
    } else {
      formData.append('image0url', this.selectedFile);
    }
    this.subscription = this._portraitService
      .updatePortrait(this.portrait._id, formData)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.portrait = response.portrait;
            this.loader = false;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Portrait was successfully updated' });
            setTimeout(() => {
              this._router.navigate(['/admin']).then(() => {
                if ((isPlatformBrowser(this.platformId))) {
                  window.location.reload();
                }
              });
            }, 1500);
          } else {
            this.loader = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Portrait update failed' });
          }
        },
        error: () => {
          this.loader = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Portrait update failed, error code 500' });
        }
      });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
