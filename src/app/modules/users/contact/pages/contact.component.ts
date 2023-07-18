import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ContactService } from '@shared/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { Global } from '@global/global';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService, MessageService]
})

export class ContactComponent implements OnInit, OnDestroy {
  public formGroup!: FormGroup;
  public url: string;
  private subscription: Subscription;
  private subscription2: Subscription;
  public titles!: string[];
  public loader: boolean = false;
  public isBrowser!: boolean;

  constructor(
    private _contactService: ContactService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: object,
    private messageService: MessageService,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.metaService.updateTag({
      property: 'title',
      content: 'Birello Gallery | Contact',
    });
    this.metaService.updateTag({
      property: 'description',
      content: 'Contact us, +54-911-6481-6622 | ignaciobirello@hotmail.com',
    });
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Contact',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Contact us, +54-911-6481-6622 | ignaciobirello@hotmail.com',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/contact',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Contact',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Contact us, +54-911-6481-6622 | ignaciobirello@hotmail.com',
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/contact',
    });
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        subject: new FormControl('', [
          Validators.required
        ]),
        paint: new FormControl('', [
          Validators.required
        ]),
        textarea: new FormControl('', [
          Validators.required
        ])
      }
    );
    this.subscription = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.paintings.paints) {
          this.titles = response.paintings.paints.map((e: { title: string; }) => { return e.title });
          this.titles.unshift("Select a painting *");
        }
      },
    });
  }

  contactForm(): void {
    this.loader = true;
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Your message is being sent' });
    const data = this.formGroup.value;
    this.subscription2 = this._contactService.getContacts(data).subscribe({
      next: () => {
        if (data.name && data.email && data.subject && data.paint && data.textarea) {
          this.loader = false;
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your message was sent' });
          this._router.navigate(['/']);
        } else {
          this.loader = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Your message was not sent' });
        }
      },
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2].forEach(e => e?.unsubscribe());
  }
}
