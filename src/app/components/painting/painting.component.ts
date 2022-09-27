import { Component, OnDestroy, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../../services/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { json } from '../../services/json.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.css'],
  providers: [],
})
export class PaintingComponent implements OnInit, OnDestroy {
  itemLD = json;
  html: SafeHtml;
  public paintings: Paintings;
  public url: string;
  public suscripcion: any;
  public suscripcion2: any;
  public enlace: any;
  public enlace2: any;
  public animation: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
    titleService.setTitle('Paintings | Birello Gallery');
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
            content: this.paintings.descripcion,
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
            content: this.paintings.descripcion,
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
    let div = document.createElement('div');
    body.appendChild(div);
    let imagenes: NodeListOf<HTMLImageElement> = document.querySelectorAll('.room-preview img');
    let roomPreview = document.querySelector('.room-preview');

    let next = document.createElement('img');
    let volver = document.createElement('img');
    let close = document.createElement('img');

    div.appendChild(next);
    div.appendChild(volver);
    div.appendChild(close);

    next.src = 'assets/img/gallery/next.png';
    next.style.width = '50px';
    next.style.height = '45px';
    next.style.position = 'absolute';
    next.style.right = '0';
    next.style.cursor = 'pointer';

    volver.src = 'assets/img/gallery/prev.png';
    volver.style.width = '50px';
    volver.style.height = '45px';
    volver.style.position = 'absolute';
    volver.style.left = '0';
    volver.style.cursor = 'pointer';

    close.style.position = 'absolute';
    close.style.right = '20px';
    close.style.top = '20px';
    close.style.cursor = 'pointer';
    close.src = 'assets/img/gallery/close.png';

    div.style.height = '100vh';
    div.style.width = '100%';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.background = 'rgb(0,0,0,0.6)';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'center';
    div.style.justifyContent = 'center';
    div.style.overflow = 'hidden';

    let index = i;

    for (let i = 0; i < imagenes.length; i++) {
      imagenes[i].classList.remove('room-active-prevg');
      div.appendChild(imagenes[i]);
      imagenes[i].loading = 'lazy';
      imagenes[i].classList.add('noneevents');
    }
    for (index = 0; index < imagenes.length; index++) {
      imagenes[index].classList.remove('activo');
    }
    imagenes[i].classList.add('activo');
    index = i;
    next.addEventListener('click', () => {
      if (index >= imagenes.length - 1) {
      } else {
        imagenes[index].classList.remove('activo');
        index++;
        imagenes[index].classList.add('activo');
      }
    });
    volver.addEventListener('click', () => {
      if (index <= 0) {
      } else {
        imagenes[index].classList.remove('activo');
        index--;
        imagenes[index].classList.add('activo');
      }
    });

    close.addEventListener('click', () => {
      div.style.animation = 'disappears 1s';
      setTimeout(() => {
        div.style.display = 'none';
      }, 1000);
      body.style.overflow = 'visible';
      for (let i = 0; i < imagenes.length; i++) {
        imagenes[i].classList.add('room-active-prevg');
        imagenes[i].classList.remove('noneevents');
        roomPreview.appendChild(imagenes[i]);
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
