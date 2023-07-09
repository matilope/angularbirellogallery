import { Component, OnDestroy, OnInit } from '@angular/core';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-painting-update',
  templateUrl: './painting-update.component.html',
  styleUrls: ['./painting-update.component.scss'],
  providers: [PaintingsService, MessageService, ConfirmationService],
})
export class PaintingUpdateComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public painting: Painting;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;
  public selectedFileMain: File | null = null;
  public selectedFileSecond: File | null = null;
  public selectedFileThird: File | null = null;
  public loader: boolean = false;

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Edit painting");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.getPintura();
    this.formGroup = new FormGroup(
      {
        title: new FormControl(this.painting.title, [
          Validators.required,
          Validators.maxLength(140)
        ]),
        subtitle: new FormControl(this.painting.subtitle, [
          Validators.required,
          Validators.maxLength(140)
        ]),
        description: new FormControl(this.painting.description, [
          Validators.required
        ]),
        dimension: new FormControl(this.painting.dimension, [
          Validators.required,
          Validators.maxLength(140)
        ]),
        characteristics: new FormControl(this.painting.characteristics, [
          Validators.required,
          Validators.maxLength(200)
        ]),
        link: new FormControl(this.painting.link, [
          Validators.required
        ]),
        link2: new FormControl(this.painting.link2),
        image0url: new FormControl(this.painting.image0url, [
          Validators.required
        ])
      }
    );
    console.log("image0->" + this.painting.image0url)
    console.log("image1->" + this.painting.image1url)
    console.log("image2->" + this.painting.image2url)
  }

  onFileSelected(event: any, index: number): void {
    if (index === 0) {
      this.selectedFileMain = event.target.files[0];
    }
    if (index === 1) {
      this.selectedFileSecond = event.target.files[0];
    }
    if (index === 2) {
      this.selectedFileThird = event.target.files[0];
    }
    console.log("change0->" + this.selectedFileMain)
    console.log("change1->" + this.selectedFileSecond)
    console.log("change2->" + this.selectedFileThird)
  }

  onSubmit(): void {
    this.loader = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Painting is being updated' });
    const { title, subtitle, description, dimension, characteristics, link, link2 } = this.formGroup.value;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('dimension', dimension);
    formData.append('characteristics', characteristics);
    formData.append('link', link);
    formData.append('link2', link2);
    if (this.selectedFileMain == null) {
      formData.append('image0url', this.painting.image0url);
    } else {
      formData.append('image0url', this.selectedFileMain);
    }
    if (this.selectedFileSecond == null) {
      formData.append('image1url', this.painting.image1url);
    } else {
      formData.append('image1url', this.selectedFileSecond);
    }
    if (this.selectedFileThird == null) {
      formData.append('image2url', this.painting.image2url);
    } else {
      formData.append('image2url', this.selectedFileThird);
    }

    this.subscription = this._paintingsService
      .update(this.painting._id, formData)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.painting = response.paints;
            this.loader = false;
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The painting was updated' });
            setTimeout(() => {
              this._router.navigate(['/painting/view/' + this.painting._id]);
            }, 1500);
          } else {
            this.loader = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The painting could not be updated' });
            setTimeout(() => {
              this._router.navigate(['/admin/update/' + this.painting._id]);
            }, 1500);
          }
        },
      });
  }

  deleteImg(index: number): void {
    this.confirmationService.confirm({
      message: 'Are you certain you want to delete the image?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.subscription3 = this._paintingsService.deleteImg(this.painting._id, index).subscribe({
          next: response => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'The image was deleted' });
            if (response.status == "Success") {
              if (index === 0) {
                this.painting.image0url = null;
                this.formGroup.get('image0url')?.setValue(null);
                this.selectedFileMain = null;
              }
              if (index === 1) {
                this.painting.image1url = null;
                this.selectedFileSecond = null;
              }
              if (index === 2) {
                this.painting.image2url = null;
                this.selectedFileThird = null;
              }
            }
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The image could not be deleted' });
          },
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'warn', summary: 'Rejected', detail: 'The image was not deleted' });
      }
    });
  }

  getPintura(): void {
    this.subscription2 = this._route.data.subscribe(response => {
      if (response.painting.paints) {
        this.painting = response.painting.paints;
      }
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
