import { Component, OnDestroy, OnInit } from '@angular/core';
import { Token } from '@core/models/token';
import { InstagramService } from '@shared/services/instagram.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-token-update',
  templateUrl: './token-update.component.html',
  styleUrls: ['./token-update.component.scss'],
  providers: [InstagramService],
})
export class TokenUpdateComponent implements OnInit, OnDestroy {
  public formData!: FormGroup;
  public token: Token;
  private tokenId!: string;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;

  constructor(
    private _instagramService: InstagramService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    this.titleService.setTitle("Refresh Instagram's token");
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
    this.getToken();
  }

  onSubmit(): void {
    this.subscription = this._instagramService
      .updateToken(this.tokenId, this.token)
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

  getToken(): void {
    this.subscription2 = this._route.params.subscribe(params => {
      this.tokenId = params['id'];
      this.subscription3 = this._instagramService
        .getToken(this.tokenId)
        .subscribe(response => {
          if (response.token) {
            this.token = response.token.token;
          }
        });
    });
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2, this.subscription3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
