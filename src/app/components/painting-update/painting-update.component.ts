import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-painting-update',
  templateUrl: './painting-update.component.html',
  styleUrls: ['./painting-update.component.css'],
  providers: [PaintingsService],
})
export class PaintingUpdateComponent implements OnInit, OnDestroy {
  public title: string;
  public subtitle: string;
  public paintings: Paintings;
  public status: string;
  public is_update: boolean;
  public url: string;
  public suscripcion: any;
  public suscripcion2: any;
  public suscripcion3: any;
  public animation: boolean = false;
  public index: number;

  afuConfig = {
    multiple: true,
    formatsAllowed: '.jpg,.png,.gif,.jpeg,.webp',
    maxSize: '20',
    uploadAPI: {
      url: Global.url + 'create',
      method: 'POST',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Elegi el archivo',
      resetBtn: 'Resetear',
      uploadBtn: 'Subir',
      dragNDropBox: 'Agarra y dejalo',
      attachPinBtn: 'Sube la imagen de la pintura..',
      afterUploadMsg_success: 'Subido exitosamente',
      afterUploadMsg_error: 'Algo fallo',
      sizeLimit: 'Limite de tamaño',
    },
  };

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private metaService: Meta
  ) {
    this.paintings = new Paintings('', '', '', '', '', '', '', '', '', '', '', '', '', '', null);
    this.title = 'Editar pintura';
    this.subtitle = 'Puede editar los datos';
    this.is_update = true;
    this.url = Global.url;
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.getPintura();
    this.animation = true;
  }

  onSubmit() {
    this.suscripcion = this._paintingsService
      .update(this.paintings._id, this.paintings)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.status = 'Success';
            this.paintings[0] = response.paints;
            swal.fire(
              'Se ha editado correctamente',
              'Felicidades, todo un exito',
              'success'
            );
            this._router.navigate(['/painting/view/' + this.paintings._id]);
          } else {
            this.status = 'Error';
            swal.fire(
              'Ha ocurrido un error al editar la pintura',
              'Sera redireccionado a la misma pagina para volver intentar editarlo, de todas maneras sugiero que se fije si se edito correctamente',
              'warning'
            );
            this._router.navigate(['/admin/update/' + this.paintings._id]);
          }
        },
      });
  }

  imageUpload(data: {
    body: {
      status: string,
      image0url: string,
      image1url: string,
      image2url: string,
      image3url: string,
      image4url: string,
      image5url: string,
    },
    status: number
  }) {
    let image0url = data.body.image0url;
    this.paintings.image0url = image0url;
    let image1url = data.body.image1url;
    this.paintings.image1url = image1url;
    let image2url = data.body.image2url;
    this.paintings.image2url = image2url;
    let image3url = data.body.image3url;
    this.paintings.image3url = image3url;
    let image4url = data.body.image4url;
    this.paintings.image4url = image4url;
    let image5url = data.body.image5url;
    this.paintings.image5url = image5url;
  }

  deleteImg(data: {
    body: {
      status: string,
      image0url: string,
      image1url: string,
      image2url: string,
      image3url: string,
      image4url: string,
      image5url: string,
    },
    status: number
  }, index: number) {
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
            .deleteImg(this.paintings, this.index)
            .subscribe({
              next: (response) => {
                if (response.status == "Success") {
                  if (response.status == "Success") {
                    if (response.paints.image0url) {
                      this.paintings.image0url = response.paints.image0url;
                    }
                    if (response.paints.image1url) {
                      this.paintings.image1url = response.paints.image1url;
                    }
                    if (response.paints.image2url) {
                      this.paintings.image2url = response.paints.image2url;
                    }
                    if (response.paints.image3url) {
                      this.paintings.image3url = response.paints.image3url;
                    }
                    if (response.paints.image4url) {
                      this.paintings.image4url = response.paints.image4url;
                    }
                    if (response.paints.image5url) {
                      this.paintings.image5url = response.paints.image5url;
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

  getPintura() {
    this.suscripcion2 = this._route.params.subscribe(params => {
      this.suscripcion3 = this._route.data.subscribe(response => {
        if (response.painting.paints) {
          this.paintings = response.painting.paints;
        }
      });
    });
  }

  ngOnDestroy(): void {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e =>
      e?.unsubscribe()
    );
    this.animation = false;
  }
}
