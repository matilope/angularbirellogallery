import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';

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
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url+"create",
      method:"POST"
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
    private metaService: Meta
  ) {
    this.paintings = new Paintings("", "", "", null, "", null, "", null, "", null, "", null, "", null, "", "", "", "", "", "", "", "", "", "", null);
    this.title = "Editar pintura";
    this.subtitle = "Puede editar los datos";
    this.is_update= true;
    this.url = Global.url;
    this.metaService.addTag(
      {
       name: 'robots', 
       content: 'noindex, nofollow'
      }

    );
  }

  ngOnInit(): void {
    this.getPintura();
  }

  onSubmit() {
    this._paintingsService.update(this.paintings._id, this.paintings).subscribe(
      response => {
        if (response.status == "Success") {
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
    );
  }
  
  imageUpload(data){
    let image_data0 = data.body.image0;
    let image_data1 = data.body.image1;
    let image_data2 = data.body.image2;
    let image_data3 = data.body.image3;
    let image_data4 = data.body.image4;
    let image_data5 = data.body.image5;
    this.paintings.image0 = image_data0;
    this.paintings.image1 = image_data1;
    this.paintings.image2 = image_data2;
    this.paintings.image3 = image_data3;
    this.paintings.image4 = image_data4;
    this.paintings.image5 = image_data5;
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