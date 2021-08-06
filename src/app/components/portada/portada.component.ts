import { Component, OnInit } from '@angular/core';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import swal from'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.css'],
  providers: [PortraitService]
})
export class PortadaComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public portrait: Portrait;
  public status: string;
  public is_update: boolean;
  public url: string;

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: Global.url+"portrait/upload",
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
      attachPinBtn: 'Sube imagen de portada..',
      afterUploadMsg_success: 'Subido exitosamente',
      afterUploadMsg_error: 'Algo fallo',
      sizeLimit: 'Limite de tamaño'
    }
};

  constructor(
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private metaService: Meta
  ) {
    this.portrait = new Portrait("", "", "", "", null);
    this.title = "Editar portada";
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
    this.getPortrait();
  }

  onSubmit() {
    this._portraitService.updatePortrait(this.portrait._id, this.portrait).subscribe(
      response => {
        if (response.status == "Success") {
          this.status = "Success"
          this.portrait = response.portrait;
        swal.fire(
          'Se ha editado correctamente',
          'Felicidades, todo un exito',
          'success'
        );
        this._router.navigate(["/admin"]).then(() => {
          window.location.reload();
        });
        }
        else {
          this.status = "Error";
        }
      },
      error => {
        this.status = "Error";
        swal.fire(
          'Ha ocurrido un error al editar la portada',
          'Sera redireccionado a la misma pagina para volver intentar editarlo, de todas maneras sugiero que se fije si se edito correctamente',
          'warning'
        );
        this._router.navigate(["/admin/change/portada/"+this.portrait._id]);
      }
    );
  }
  
  imageUpload(data){
    let image_data0 = data.body.image0;
    this.portrait.image0 = image_data0;
    let image0url = data.body.image0url;
    this.portrait.image0url = image0url;
  }

  getPortrait(){
    this._route.params.subscribe(params => {
      let portraitId = params['id'];
      this._portraitService.getPortrait(portraitId).subscribe(
        response => {
          if (response.portrait) {
            this.portrait = response.portrait;
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
