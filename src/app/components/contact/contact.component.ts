import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService, PaintingsService]
})
export class ContactComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public status: string;
  public user: any;
  public paintings: Paintings[];
  public url: string;

  constructor(private _contactService: ContactService,
    private _paintingsService: PaintingsService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta) {

    this.title = "Contact";
    this.subtitle = "+54-911-6481-6622 | ignaciobirello@hotmail.com";
    this.user = {
      name: "",
      email: "",
      subject: "",
      paint: "",
      textarea: ""
    }
    titleService.setTitle("Contact | Birello Gallery");
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Contact'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Contact us, +54-911-6481-6622 | ignaciobirello@hotmail.com'
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/contact'
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Contact'
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Contact us, +54-911-6481-6622 | ignaciobirello@hotmail.com'
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/contact'
    });
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._paintingsService.getPaintings().subscribe(
      response => {
        if (response.paints) {
          this.paintings = response.paints;
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  tiempo() {
    let timerInterval;
    swal.fire({
      title: 'Your message is being sent',
      html: 'This alert will close automatically',
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === swal.DismissReason.timer) {
      }
    })
  }

  contactForm() {
    this._contactService.getContacts(this.user).subscribe(() => {
      if (this.user) {
        swal.fire("Contact form", "Your message was sent", "success");
        this._router.navigate(['/']);
      }
      else {
        swal.fire("Contact form", "Your message was not sent, please try again", "warning")
        this._router.navigate(['/contact']);
      }

    })
  }

}


