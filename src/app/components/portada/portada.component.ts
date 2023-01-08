import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css'],
  providers: [PortraitService],
})
export class PortadaComponent implements OnInit, OnDestroy {
  public title: string;
  public subtitle: string;
  public portrait: Portrait;
  public status: string;
  public is_update: boolean;
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;
  public subido: boolean = false;

  afuConfig = {
    multiple: true,
    formatsAllowed: '.jpg,.png,.gif,.jpeg,.webp',
    maxSize: '50',
    uploadAPI: {
      url: Global.url + 'portrait/upload',
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
      attachPinBtn: 'Sube imagen de portada..',
      afterUploadMsg_success: 'Subido exitosamente',
      afterUploadMsg_error: 'Algo fallo',
      sizeLimit: 'Limite de tamaño',
    },
  };

  constructor(
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private readonly renderer: Renderer2
  ) {
    this.portrait = new Portrait('', '', '', null);
    this.title = 'Editar portada';
    this.subtitle = 'Puede editar los datos';
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

  onSubmit() {
    this.suscripcion = this._portraitService
      .updatePortrait(this.portrait._id, this.portrait)
      .subscribe({
        next: response => {
          if (response.status == 'Success') {
            this.status = 'Success';
            this.portrait[0] = response.portrait;
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

  loader() {
    this.subido = false;
    if (!this.subido) {
      swal.fire({
        title: 'La imagen portada se esta subiendo',
        html: `<p>En caso de no haber seleccionado una imagen portada y haberle dado a cancelar, por favor dale click a "cancelar"</p>
              <div class="spinner-border text-primary" style="color:rgba(var(--bs-primary-rgb),var(--bs-text-opacity))!important;" role="status">
              </div>`,
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  }

  imageUpload(data: any) {
    let image0url = data.body.image0url;
    this.portrait.image0url = image0url;
    this.subido = true;
    let swal = this.renderer.selectRootElement(".swal2-container", true);
    this.renderer.removeChild(document.body, swal);
    this.renderer.removeClass(document.body, "swal2-shown swal2-height-auto");
  }

  getPortrait() {
    this.suscripcion2 = this._route.params.subscribe(params => {
      let portraitId = params['id'];
      this.suscripcion3 = this._portraitService
        .getPortrait(portraitId)
        .subscribe({
          next: response => {
            if (response.portrait) {
              this.portrait = response.portrait;
            }
          },
        });
    });
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e =>
      e?.unsubscribe()
    );
  }
}
