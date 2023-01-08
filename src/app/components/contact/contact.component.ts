import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Global } from '../../services/global';
import { Subscription } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService],
})
export class ContactComponent implements OnInit, OnDestroy {
  public title: string;
  public subtitle: string;
  public status: string;
  public user: any;
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public titulo: any;

  constructor(
    private _contactService: ContactService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.title = 'Contact';
    this.subtitle = '+54-911-6481-6622 | ignaciobirello@hotmail.com';
    this.user = {
      name: '',
      email: '',
      subject: '',
      paint: '',
      textarea: '',
    };

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
    this.suscripcion = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.paintings.paints) {
          this.titulo = response.paintings.paints.map((e: { titulo: string; }) => { return e.titulo });
        }
      },
    });
  }

  tiempo(form: HTMLFormElement) {
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
          /* Read more about handling dismissals below */
          if (result.dismiss === swal.DismissReason.timer) {
          }
        });
    } else {
      let timerInterval: number;
      swal.fire({
        title: 'Form is invalid',
        html: 'Please check if everything is correct',
        timer: 2000,
        timerProgressBar: true,
        willClose: () => {
          clearInterval(timerInterval);
        },
      })
        .then(result => {
          /* Read more about handling dismissals below */
          if (result.dismiss === swal.DismissReason.timer) {
          }
        });
    }
  }

  contactForm(form: HTMLFormElement) {
    if (form.valid) {
      this.suscripcion2 = this._contactService.getContacts(this.user).subscribe({
        next: () => {
          if (this.user) {
            swal.fire('Contact form', 'Your message was sent', 'success');
            this._router.navigate(['/']);
          } else {
            swal.fire('Contact form', 'Your message was not sent, please try again', 'warning');
            this._router.navigate(['/contact']);
          }
        },
      });
    }
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2].forEach(e => e?.unsubscribe());
  }
}
