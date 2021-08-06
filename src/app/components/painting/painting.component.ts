import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { json } from '../../services/json.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.css'],
  providers: [PaintingsService]
})
export class PaintingComponent implements OnInit {

  itemLD = json;
  html: SafeHtml;
  public paintings: Paintings;
  public url: string;

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    titleService.setTitle("Paintings | Birello Gallery");
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let pinturaId = params['id'];
      this._paintingsService.getPainting(pinturaId).subscribe(
        response => {
          if (response.paints) {
            this.paintings = response.paints;
            this.metaService.updateTag({
              property: 'og:title',
              content: 'Birello Gallery | ' + this.paintings.titulo
            });
            this.metaService.updateTag({
              property: 'og:description',
              content: this.paintings.descripcion
            });
            this.metaService.updateTag({
              property: 'og:image',
              content: this.paintings.image0url
            });
            this.metaService.updateTag({
              property: 'og:url',
              content: 'https://www.birellogallery.com/painting/view/' + this.paintings._id
            });
            this.metaService.updateTag({
              name: 'keywords',
              content: this.paintings.titulo + ", " + this.paintings.subtitulo
            });
            this.metaService.updateTag({
              property: 'twitter:title',
              content: 'Birello Gallery | ' + this.paintings.titulo
            });
            this.metaService.updateTag({
              property: 'twitter:description',
              content: this.paintings.descripcion
            });
            this.metaService.updateTag({
              property: 'twitter:image',
              content: this.paintings.image0url
            });
            this.metaService.updateTag({
              property: 'twitter:url',
              content: 'https://www.birellogallery.com/painting/view/' + this.paintings._id
            });
          } else {
            this._router.navigate(["/"]);

          }
        },
        error => {
          this._router.navigate(["/"]);
        }
      );
    });
    this.html = this.getSafeHTML(this.itemLD);

  }

  getSafeHTML(jsonLD: { [key: string]: any }): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
