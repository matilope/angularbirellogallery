import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from'sweetalert2';

@Component({
  selector: 'app-painting-update',
  templateUrl: './painting-update.component.html',
  styleUrls: ['./painting-update.component.css'],
  providers: [PaintingsService]
})
export class PaintingUpdateComponent implements OnInit {

  public title: string;
  public subtitle: string;
  public paintings: Paintings;
  public status: string;
  public is_update: boolean;
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
      attachPinBtn: 'Actualiza la imagen de tu pintura',
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
    this.title = "Editar pintura ";
    this.subtitle = "Puede editar los datos";
    this.is_update= true;
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.getPintura();
    
  }

  onSubmit() {
    this._paintingsService.update(this.paintings._id, this.paintings).subscribe(
      response => {
        if (response) {
          this.status = "Success"
          this.paintings = response.paints;
          swal.fire(
            'Se ha editado correctamente',
            'Felicidades, todo un exito',
            'success'
          );
          this._router.navigate(["/painting/view/"+this.paintings._id]);
        }
        else {
          this.status = "Error";
        }
      },
      error => {
        console.log(error);
        this.status = "Error";
        swal.fire(
          'Ha ocurrido un error al editar la pintura',
          'Sera redireccionado a la misma pagina para volver intentar editarlo, de todas maneras sugiero que se fije si se edito correctamente',
          'warning'
        );
        this._router.navigate(["/admin/update/"+this.paintings._id]);
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

  getPintura(){
    this._route.params.subscribe(params => {
      let pinturaId = params['id'];
      this._paintingsService.getPainting(pinturaId).subscribe(
        response => {
          if (response.paints) {
            this.paintings = response.paints;
          } else {

          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}