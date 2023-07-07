import { Component, OnDestroy, OnInit } from '@angular/core';
import { Portrait } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global//global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-portrait',
  templateUrl: './portrait.component.html',
  styleUrls: ['./portrait.component.css'],
  providers: [PortraitService],
})

export class PortraitComponent implements OnInit, OnDestroy {
  public portrait: Portrait;
  public status: string;
  public is_update: boolean;
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;
  public subido: boolean = false;

  constructor(
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.is_update = true;
    this.url = Global.url;
    this.titleService.setTitle("Cambiar portada");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.getPortrait();
  }

  onSubmit(): void {
    this.suscripcion = this._portraitService
      .updatePortrait(this.portrait._id, this.portrait)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.status = 'Success';
            this.portrait = response.portraits;
            swal.fire(
              'Se ha editado correctamente',
              'Felicidades, todo un exito',
              'success'
            );
            setTimeout(() => {
              this._router.navigate(['/admin']).then(() => {
                window.location.reload();
              });
            }, 2000);
          } else {
            this.status = 'Error';
            swal.fire(
              'Ha ocurrido un error al editar la portada',
              'Sera redireccionado a la misma pagina para volver intentar editarlo, de todas maneras sugiero que se fije si se edito correctamente',
              'warning'
            );
            setTimeout(() => {
              this._router.navigate([
                '/admin/change/portada/' + this.portrait._id,
              ]);
            }, 2000);
          }
        },
      });
  }

  getPortrait(): void {
    this.suscripcion2 = this._route.params.subscribe(params => {
      let portraitId = params['id'];
      this.suscripcion3 = this._portraitService
        .getPortrait(portraitId)
        .subscribe({
          next: response => {
            if (response.portraits) {
              this.portrait = response.portraits;
            }
          },
        });
    });
  }

  ngOnDestroy(): void {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
