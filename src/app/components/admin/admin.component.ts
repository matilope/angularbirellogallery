import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [PaintingsService, PortraitService]
})
export class AdminComponent implements OnInit {

  public principal: string;
  public subtitulo: string;
  public portrait: Portrait[];
  public paintings: Paintings[];
  public url: string;

  constructor(
    private _paintingsService: PaintingsService,
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.principal = "Panel de admin";
    this.subtitulo = "Vas a poder crear, editar y eliminar tus pinturas";
    this.url = Global.url;
    titleService.setTitle("Admin | Birello Gallery");
    this.metaService.addTag(
      {
       name: 'robots', 
       content: 'noindex, nofollow'
      }

    );
  }

  ngOnInit(): void {
    this._paintingsService.getPaintings().subscribe(
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

    this._portraitService.getPortraits().subscribe(
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

  }

  delete(id) {
    swal.fire({
      title: '¿ Estas seguro que quieres eliminar esta pintura ?',
      text: "No vas a poder recuperarla",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero eliminarla',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this._paintingsService.delete(id).subscribe(
          response => {
            swal.fire(
              'Eliminada',
              'La pintura se ha eliminado correctamente',
              'success'
            )
            this._router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          },
          error => {
            this._router.navigate(['/admin']).then(() => {
              window.location.reload();
            });
          }
        );
      } else {
        swal.fire("Tu pintura se ha salvado y no se ha eliminado");
      }
    });
  }

}