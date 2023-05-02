import { Component, OnInit, Renderer2 } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router } from '@angular/router';
import { Global } from '../../services/global';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painting-new',
  templateUrl: './painting-new.component.html',
  styleUrls: ['./painting-new.component.css'],
  providers: [PaintingsService],
})
export class PaintingNewComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public paintings: Paintings;
  public status: string;
  public url: string;
  public suscripcion: Subscription;
  public index: number;
  public subido: boolean = false;

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
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private readonly renderer: Renderer2
  ) {
    this.paintings = new Paintings('', '', '', '', '', '', '', '', '', '', '', '', '', '', null);
    this.titleService.setTitle('Crear nueva pintura');
    this.subtitle =
      'Los datos de titulo, subtitulo, descripcion, dimension, caracteristicas y link son obligatorios.';
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
  }

  onSubmit() {
    this._paintingsService.create(this.paintings).subscribe({
      next: response => {
        if (response.status == 'Success') {
          this.status = 'Success';
          this.paintings[0] = response.paints;
          swal.fire('Tu pintura se ha subido correctamente', '', 'success');
          this._router.navigate(['/admin']);
        } else {
          this.status = 'Error';
          swal.fire(
            'Ha ocurrido un error y no se ha subido la pintura',
            'Vuelva a intentarlo luego',
            'warning'
          );
          this._router.navigate(['/admin']);
        }
      },
    });
  }

  loader() {
    this.subido = false;
    if (!this.subido) {
      swal.fire({
        title: 'Las imagenes se estan subiendo',
        html: `<p>En caso de no haber seleccionado imagenes y haberle dado a cancelar, por favor dale click a "cancelar"</p>
              <div class="spinner-border text-primary" style="color:rgba(var(--bs-primary-rgb),var(--bs-text-opacity))!important;" role="status">
              </div>`,
        showCancelButton: true,
        showConfirmButton: false,
      });
    }
  }

  imageUpload(data: {
    body: {
      image0url: string;
      image1url: string;
      image2url: string;
      image3url: string;
      image4url: string;
      image5url: string;
    }}) {
    this.subido = true;
    let swal = this.renderer.selectRootElement(".swal2-container", true);
    this.renderer.removeChild(document.body, swal);
    this.renderer.removeAttribute(document.body, "class");
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
}
