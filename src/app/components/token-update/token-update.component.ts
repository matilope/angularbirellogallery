import { Component, OnDestroy, OnInit } from '@angular/core';
import { Token } from '../../models/token';
import { InstagramService } from '../../services/instagram.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-token-update',
  templateUrl: './token-update.component.html',
  styleUrls: ['./token-update.component.css'],
  providers: [InstagramService],
})
export class TokenUpdateComponent implements OnInit, OnDestroy {
  public subtitle: string;
  public tokendata: Token;
  public url: string;
  public status: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;
  public animation: boolean = false;

  constructor(
    private _instagramService: InstagramService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Actualizar token de instagram");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
    this.tokendata = new Token('', '');
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.getToken();
    this.animation = true;
  }

  onSubmit() {
    this.suscripcion = this._instagramService
      .updateToken(this.tokendata._id, this.tokendata)
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

  getToken() {
    this.suscripcion2 = this._route.params.subscribe(params => {
      let tokenId = params['id'];
      this.suscripcion3 = this._instagramService
        .getToken(tokenId)
        .subscribe(response => {
          if (response.token) {
            this.tokendata = response.token;
          }
        });
    });
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e =>
      e?.unsubscribe()
    );
    this.animation = false;
  }
}
