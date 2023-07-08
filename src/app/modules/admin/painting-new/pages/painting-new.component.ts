import { Component, OnInit } from '@angular/core';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Router } from '@angular/router';
import { Global } from '@global/global';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-painting-new',
  templateUrl: './painting-new.component.html',
  styleUrls: ['./painting-new.component.scss'],
  providers: [PaintingsService],
})
export class PaintingNewComponent implements OnInit {
  public formData!: FormGroup;
  public painting: Painting;
  public url: string;
  public subscription: Subscription;

  constructor(
    private _paintingsService: PaintingsService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle('Create new painting');
    this.url = Global.url;
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }

  ngOnInit(): void {
    this.formData = new FormGroup(
      {
        title: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
        ]),
        subtitle: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
        ]),
        description: new FormControl('', [
          Validators.required
        ]),
        dimension: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
        ]),
        characteristics: new FormControl('', [
          Validators.required,
          Validators.maxLength(120)
        ]),
        link: new FormControl('', [
          Validators.required
        ]),
        link2: new FormControl('')
      }
    );
  }

  onSubmit(): void {
    this.subscription = this._paintingsService.save(this.painting).subscribe({
      next: response => {
        if (response.status == 'Success') {
          this.painting = response.paints;
          swal.fire('Tu pintura se ha subido correctamente', '', 'success');
          this._router.navigate(['/admin']);
        } else {
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
