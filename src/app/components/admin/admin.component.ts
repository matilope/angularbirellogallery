import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Token } from '../../models/token';
import { InstagramService } from '../../services/instagram.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PaintingsService, PortraitService, InstagramService],
})
export class AdminComponent implements OnInit, OnDestroy {
  public principal: string;
  public subtitulo: string;
  public portrait: Portrait[];
  public paintings: Paintings[];
  public token: Token[];
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;
  public suscripcion4:Subscription;

  constructor(
    private _paintingsService: PaintingsService,
    private _portraitService: PortraitService,
    private _instagramService: InstagramService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.principal = 'Panel de admin';
    this.subtitulo = 'Vas a poder crear, editar y eliminar tus pinturas';
    this.url = Global.url;
    this.titleService.setTitle('Admin | Birello Gallery');
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.suscripcion = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.paintings.paints) {
          this.paintings = response.paintings.paints;
        }
      },
    });

    this.suscripcion2 = this._portraitService.getPortraits().subscribe({
      next: response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        }
      },
    });

    this.suscripcion3 = this._instagramService.getTokens().subscribe({
      next: response => {
        if (response.token) {
          this.token = response.token;
        }
      },
    });
  }

  delete(id: string) {
    swal
      .fire({
        title: '¿ Estas seguro que quieres eliminar esta pintura ?',
        text: 'No vas a poder recuperarla',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero eliminarla',
        cancelButtonText: 'Cancelar',
      })
      .then(result => {
        if (result.isConfirmed) {
          this.suscripcion4 = this._paintingsService.delete(id).subscribe({
            next: () => {
              swal.fire(
                'Eliminada',
                'La pintura se ha eliminado correctamente',
                'success'
              );
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  window.location.reload();
                });
              }, 2000);
            },
            error: () => {
              swal.fire(
                'Error',
                'La pintura no se ha eliminado correctamente',
                'error'
              );
              setTimeout(() => {
                this._router.navigate(['/admin']).then(() => {
                  window.location.reload();
                });
              }, 2000);
            },
          });
        } else {
          swal.fire('Tu pintura se ha salvado y no se ha eliminado');
          setTimeout(() => {
            this._router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          }, 2000);
        }
      });
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2, this.suscripcion3, this.suscripcion4].forEach(e =>
      e?.unsubscribe()
    );
  }
}
