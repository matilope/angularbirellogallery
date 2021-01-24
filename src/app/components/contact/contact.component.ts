import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public status: string;
  public user: any;

  constructor(private _contactService: ContactService,
    private _router: Router) {
    this.title = "ENQUIRY FORM";
    this.subtitle = "+54 - 911 - 6481 - 6622  |  ignaciobirello@hotmail.com";
    this.user = {
      name: "",
      email: "",
      subject: "",
      paint: "",
      textarea: ""
    }
  }

  ngOnInit(): void {

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


