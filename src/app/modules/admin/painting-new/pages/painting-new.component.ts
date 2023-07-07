import { Component } from '@angular/core';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-painting-new',
  templateUrl: './painting-new.component.html',
  styleUrls: ['./painting-new.component.css'],
  providers: [PaintingsService],
})
export class PaintingNewComponent {
  public title: string;
  public subtitle: string;
  public painting: Painting;
  public status: string;
  public url: string;
  public suscripcion: Subscription;
  public index: number;
  public subido: boolean = false;

  constructor(
    private _paintingsService: PaintingsService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle('Create new painting');
    this.subtitle =
      'Title, subtitle, description, image, dimension, characteristics and link are require.';
    this.url = Global.url;
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  onSubmit() {
    this._paintingsService.save(this.painting).subscribe({
      next: response => {
        if (response.status == 'Success') {
          this.status = 'Success';
          this.painting = response.paints;
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
}
