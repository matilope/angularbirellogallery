import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from'sweetalert2';

@Component({
  selector: 'app-painting-new',
  templateUrl: './painting-new.component.html',
  styleUrls: ['./painting-new.component.css'],
  providers: [PaintingsService]
})
export class PaintingNewComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public paintings: Paintings;
  public status: string;
  public url: string;

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg, .png, .gif, .jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url+"upload-image/",
    },
    theme: "attachPin",
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
      sizeLimit: 'Limite de tamaño'
    }
};

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,
  ) {
    this.paintings = new Paintings("", null, "", "", null, null, null, null, "", "", "", "", "", "", "", "", "");
    this.title = "Crear nueva pintura";
    this.subtitle = "Los datos de titulo, subtitulo, descripcion, dimension, caracteristicas y link son obligatorios.";
    this.url = Global.url;

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._paintingsService.create(this.paintings).subscribe(
      response => {
        if (response) {
          this.status = "Success"
          this.paintings = response.paints;
          swal.fire(
            'Tu pintura se ha subido correctamente',
            '',
            'success'
          );
          this._router.navigate(["/admin"]);
        }
        else {
          this.status = "Error";
        }
      },
      error => {
        console.log(error);
        this.status = "Error";
        swal.fire(
          'Ha ocurrido un error y no se ha subido la pintura',
          'Vuelva a intentarlo luego',
          'warning'
        );
        this._router.navigate(["/admin"]);
      }
    )
  }
  imageUpload(data){
    let image_data = data.body;
    this.paintings.image = image_data.image;
    this.paintings.image2= image_data.image2;
    this.paintings.image3= image_data.image3;
    this.paintings.image4= image_data.image4;

  }

}
