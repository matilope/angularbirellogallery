import { Component, OnDestroy } from '@angular/core';
import { Token } from '../../models/token';
import { InstagramService } from '../../services/instagram.service';
import { Router } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-token-new',
  templateUrl: './token-new.component.html',
  styleUrls: ['./token-new.component.css'],
  providers: [InstagramService],
})
export class TokenNewComponent implements OnDestroy {
  public subtitle: string;
  public tokendata: Token;
  public url: string;
  public status: string;
  public suscripcion: Subscription;
  public animation: boolean = false;

  constructor(
    private _instagramService: InstagramService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Crear token de instagram");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
    this.tokendata = new Token('', '');
  }

  onSubmit(): void {
    this.suscripcion = this._instagramService
      .saveToken(this.tokendata)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.status = 'Success';
            this.tokendata = response.token;
            swal.fire('El token se ha guardado', '', 'success');
            this._router.navigate(['/miscellaneous']);
          } else {
            this.status = 'Error';
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
