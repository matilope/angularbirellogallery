import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '@shared/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Global } from '@global/global';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [ContactService],
})

export class ContactComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  public url: string;
  private subscription: Subscription;
  private subscription2: Subscription;
  public titles: string[];

  constructor(
    private _contactService: ContactService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('Contact | Birello Gallery');
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
    this.formData = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        subject: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
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
        }
      },
    });
  }

  tiempo(form: any): void {
    if (form.valid) {
      let timerInterval: number;
      swal.fire({
        title: 'Your message is being sent',
        html: 'This alert will close automatically',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      })
        .then(result => {
          if (result.dismiss === swal.DismissReason.timer) {
          }
        });
    } else {
      let timerInterval: number;
      swal.fire({
        title: 'Form is invalid',
        html: 'Every field is require',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      })
        .then(result => {
          if (result.dismiss === swal.DismissReason.timer) {
          }
        });
    }
  }

  contactForm(): void {
    const data = this.formData.value;
    this.subscription2 = this._contactService.getContacts(data).subscribe({
      next: () => {
        if (data.name && data.email && data.subject && data.paint && data.textarea) {
          swal.fire('Contact form', 'Your message was sent', 'success');
          this._router.navigate(['/']);
        } else {
          swal.fire('Contact form', 'Your message was not sent, please try again', 'warning');
          this._router.navigate(['/contact']);
        }
      },
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2].forEach(e => e?.unsubscribe());
  }
}
