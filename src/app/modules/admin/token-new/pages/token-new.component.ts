import { Component, OnDestroy, OnInit } from '@angular/core';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-token-new',
  templateUrl: './token-new.component.html',
  styleUrls: ['./token-new.component.scss'],
  providers: [InstagramService],
})
export class TokenNewComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  public token: Token;
  public url: string;
  public suscripcion: Subscription;
  public animation: boolean = false;

  constructor(
    private _instagramService: InstagramService,
    private _router: Router,
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
    this.formData = new FormGroup(
      {
        token: new FormControl('', [
          Validators.required
        ])
      }
    );
  }

  onSubmit(): void {
    this.suscripcion = this._instagramService
      .saveToken(this.token)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.token = response.token;
            swal.fire('El token se ha guardado', '', 'success');
            this._router.navigate(['/miscellaneous']);
          } else {
            swal.fire(
              'Ha ocurrido un error y no se ha guardado el token',
              'Vuelva a intentarlo luego',
              'warning'
            );
            this._router.navigate(['/admin']);
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
