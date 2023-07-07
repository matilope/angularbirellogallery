import { Component, OnDestroy, OnInit } from '@angular/core';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-painting-update',
  templateUrl: './painting-update.component.html',
  styleUrls: ['./painting-update.component.css'],
  providers: [PaintingsService],
})
export class PaintingUpdateComponent implements OnInit, OnDestroy {
  public title: string;
  public subtitle: string;
  public painting: Painting;
  public status: string;
  public is_update: boolean;
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;
  public index: number;
  public subido: boolean = false;

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.title = 'Editar pintura';
    this.subtitle = 'Puede editar los datos';
    this.is_update = true;
    this.url = Global.url;
    this.titleService.setTitle("Actualizar los datos de la pintura");
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.getPintura();
  }

  onSubmit(): void {
    this.suscripcion = this._paintingsService
      .update(this.painting._id, this.painting)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.status = 'Success';
            this.painting = response.paints;
            swal.fire(
              'Se ha editado correctamente',
              'Felicidades, todo un exito',
              'success'
            );
            this._router.navigate(['/painting/view/' + this.painting._id]);
          } else {
            this.status = 'Error';
            swal.fire(
              'Ha ocurrido un error al editar la pintura',
              'Sera redireccionado a la misma pagina para volver intentar editarlo, de todas maneras sugiero que se fije si se edito correctamente',
              'warning'
            );
            this._router.navigate(['/admin/update/' + this.painting._id]);
          }
        },
      });
  }

  deleteImg(data: {
    body: {
      status: string,
      image0url: string,
      image1url: string,
      image2url: string
    },
    status: number
  }, index: number): void {
    this.index = index;
    swal
      .fire({
        title: '¿ Estas seguro que quieres eliminar esta imagen ?',
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
          this._paintingsService
            .deleteImg(this.painting, this.index)
            .subscribe({
              next: (response) => {
                if (response.status == "Success") {
                  if (response.status == "Success") {
                    if (response.paints.image0url) {
                      this.painting.image0url = response.paints.image0url;
                    }
                    if (response.paints.image1url) {
                      this.painting.image1url = response.paints.image1url;
                    }
                    if (response.paints.image2url) {
                      this.painting.image2url = response.paints.image2url;
                    }
                  }
                }
              }
            })
          swal.fire('Tu imagen se ha eliminado');
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        } else {
          swal.fire('Tu imagen se ha salvado y no se ha eliminado');
        }
      })
  }

  getPintura(): void {
    this.suscripcion2 = this._route.params.subscribe(params => {
      this.suscripcion3 = this._route.data.subscribe(response => {
        if (response.painting.paints) {
          this.painting = response.painting.paints;
        }
      });
    });
  }

  ngOnDestroy(): void {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
