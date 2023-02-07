import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { json } from '../../services/json.service';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.css'],
  providers: [],
})
export class PaintingComponent implements OnInit, OnDestroy {
  public itemLD = json;
  public html: SafeHtml;
  public paintings: Paintings;
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public enlace: string | string[];
  public enlace2: string | string[];
  public animation: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta,
    private renderer: Renderer2
  ) {
    this.url = Global.url;
    this.titleService.setTitle('Paintings | Birello Gallery');
  }

  ngOnInit() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    this.html = this.getSafeHTML(this.itemLD);

    this.suscripcion2 = this.activatedRoute.data.subscribe({
      next: response => {
        this.animation = true;
        if (response.painting.paints) {
          this.paintings = response.painting.paints;

          if (response.painting.paints.link.length > 2) {
            if (response.painting.paints.link.includes('http://')) {
              this.enlace = response.painting.paints.link.split('http://');
            } else {
              this.enlace = response.painting.paints.link.split('https://');
            }
            this.enlace = this.enlace[1].split('/');
            this.enlace = this.enlace[0];
          }

          if (response.painting.paints.link2.length > 2) {
            if (response.painting.paints.link.includes('http://')) {
              this.enlace2 = response.painting.paints.link2.split('http://');
            } else {
              this.enlace2 = response.painting.paints.link2.split('https://');
            }
            this.enlace2 = this.enlace2[1].split('/');
            this.enlace2 = this.enlace2[0];
          }

          this.metaService.updateTag({
            property: 'og:title',
            content: 'Birello Gallery | ' + this.paintings.titulo,
          });
          this.metaService.updateTag({
            property: 'og:description',
            content: this.paintings.descripcion.split(".")[0],
          });
          this.metaService.updateTag({
            property: 'og:image',
            content: this.paintings.image0url,
          });
          this.metaService.updateTag({
            property: 'og:url',
            content:
              'https://www.birellogallery.com/painting/view/' +
              this.paintings._id,
          });
          this.metaService.updateTag({
            name: 'keywords',
            content: this.paintings.titulo + ', ' + this.paintings.subtitulo,
          });
          this.metaService.updateTag({
            property: 'twitter:title',
            content: 'Birello Gallery | ' + this.paintings.titulo,
          });
          this.metaService.updateTag({
            property: 'twitter:description',
            content: this.paintings.descripcion.split(".")[0],
          });
          this.metaService.updateTag({
            property: 'twitter:image',
            content: this.paintings.image0url,
          });
          this.metaService.updateTag({
            property: 'twitter:url',
            content:
              'https://www.birellogallery.com/painting/view/' +
              this.paintings._id,
          });
        } else {
          this._router.navigate(['/']);
        }
      },
    });
  }

  getSafeHTML(jsonLD: { [key: string]: any }): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    // escape / to prevent script tag in JSON
    const html = `<script type="application/ld+json">${json}</script>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  lightbox(i: number) {
    let body = document.querySelector('body');
    body.style.overflow = 'hidden';
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    let div = this.renderer.createElement("div");
    this.renderer.appendChild(body, div);
    let imagenes: NodeListOf<HTMLImageElement> = document.querySelectorAll('.room-preview img');
    let roomPreview = document.querySelector('.room-preview');

    let next = this.renderer.createElement('img');
    let volver = this.renderer.createElement('img');
    let close = this.renderer.createElement('img');

    this.renderer.appendChild(div, next);
    this.renderer.appendChild(div, volver);
    this.renderer.appendChild(div, close);

    this.renderer.setAttribute(next, 'src', 'assets/img/gallery/next.png');
    this.renderer.setStyle(next, 'width', '50px');
    this.renderer.setStyle(next, 'height', '45px');
    this.renderer.setStyle(next, 'position', 'absolute');
    this.renderer.setStyle(next, 'right', '0');
    this.renderer.setStyle(next, 'cursor', 'pointer');

    this.renderer.setAttribute(volver, 'src', 'assets/img/gallery/prev.png');
    this.renderer.setStyle(volver, 'width', '50px');
    this.renderer.setStyle(volver, 'height', '45px');
    this.renderer.setStyle(volver, 'position', 'absolute');
    this.renderer.setStyle(volver, 'left', '0');
    this.renderer.setStyle(volver, 'cursor', 'pointer');

    this.renderer.setAttribute(close, 'src', 'assets/img/gallery/close.png');
    this.renderer.setStyle(close, 'position', 'absolute');
    this.renderer.setStyle(close, 'top', '20px');
    this.renderer.setStyle(close, 'right', '20px');
    this.renderer.setStyle(close, 'cursor', 'pointer');

    this.renderer.setStyle(close, 'position', 'absolute');
    this.renderer.setStyle(close, 'top', '20px');
    this.renderer.setStyle(close, 'right', '20px');
    this.renderer.setStyle(close, 'cursor', 'pointer');

    this.renderer.setStyle(div, 'height', '100vh');
    this.renderer.setStyle(div, 'width', '100%');
    this.renderer.setStyle(div, 'position', 'absolute');
    this.renderer.setStyle(div, 'top', '0');
    this.renderer.setStyle(div, 'background', 'rgb(0,0,0,0.6)');
    this.renderer.setStyle(div, 'display', 'flex');
    this.renderer.setStyle(div, 'flex-direction', 'column');
    this.renderer.setStyle(div, 'align-items', 'center');
    this.renderer.setStyle(div, 'justify-content', 'center');
    this.renderer.setStyle(div, 'overflow', 'hidden');

    let index = i;

    for (let i = 0; i < imagenes.length; i++) {
      this.renderer.removeClass(imagenes[i], 'room-active-prevg');
      this.renderer.appendChild(div, imagenes[i]);
      this.renderer.setAttribute(imagenes[i], 'loading', 'lazy');
      this.renderer.addClass(imagenes[i], 'noneevents');
    }
    for (index = 0; index < imagenes.length; index++) {
      this.renderer.removeClass(imagenes[index], 'activo');
    }
    this.renderer.addClass(imagenes[i], 'activo');
    index = i;
    next.addEventListener('click', () => {
      if (index >= imagenes.length - 1) {
      } else {
        this.renderer.removeClass(imagenes[index], 'activo');
        index++;
        this.renderer.addClass(imagenes[index], 'activo');
      }
    });
    volver.addEventListener('click', () => {
      if (index <= 0) {
      } else {
        this.renderer.removeClass(imagenes[index], 'activo');
        index--;
        this.renderer.addClass(imagenes[index], 'activo');
      }
    });

    close.addEventListener('click', () => {
      this.renderer.setStyle(div, 'animation', 'disappears 1s');
      setTimeout(() => {
        this.renderer.setStyle(div, 'display', 'none');
      }, 1000);
      this.renderer.setStyle(body, 'overflow', 'visible');
      for (let i = 0; i < imagenes.length; i++) {
        this.renderer.addClass(imagenes[i], 'room-active-prevg');
        this.renderer.removeClass(imagenes[i], 'noneevents');
        this.renderer.appendChild(roomPreview, imagenes[i]);
      }
    });

    setTimeout(() => {
      if (div.getBoundingClientRect().top < -20) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    }, 1000);
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2].forEach(e => e?.unsubscribe());
    this.animation = false;
  }
}
