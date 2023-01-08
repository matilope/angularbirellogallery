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
    this.html = this.getSafeHTML(this.itemLD);

    this.suscripcion2 = this.activatedRoute.data.subscribe({
      next: response => {
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
    let div = this.renderer.createElement("div");
    this.renderer.appendChild(body, div);
    let imagenes: NodeListOf<HTMLImageElement> = document.querySelectorAll('.img-small');

    let preview = document.querySelector('.preview');

    let next = this.renderer.createElement('img');
    let volver = this.renderer.createElement('img');
    let close = this.renderer.createElement('img');

    this.renderer.appendChild(div, next);
    this.renderer.appendChild(div, volver);
    this.renderer.appendChild(div, close);

    this.renderer.setAttribute(next, 'src', 'assets/img/gallery/next.png');
    this.renderer.addClass(next, 'next');

    this.renderer.setAttribute(volver, 'src', 'assets/img/gallery/prev.png');
    this.renderer.addClass(volver, 'previous');

    this.renderer.setAttribute(close, 'src', 'assets/img/gallery/close.png');
    this.renderer.addClass(close, 'close');

    this.renderer.addClass(div, 'slider');

    this.renderer.setStyle(body.children[0], 'filter', 'blur(4px)');

    let index = i;

    for (let i = 0; i < imagenes.length; i++) {
      this.renderer.removeClass(imagenes[i], 'img-small');
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

    const cerrar = () => {
      this.renderer.removeStyle(body.children[0], 'filter');
      this.renderer.setStyle(div, 'animation', 'disappears 1s');
      setTimeout(() => {
        this.renderer.setStyle(div, 'display', 'none');
      }, 1000);
      this.renderer.setStyle(body, 'overflow', 'visible');
      for (let i = 0; i < imagenes.length; i++) {
        this.renderer.addClass(imagenes[i], 'img-small');
        this.renderer.removeClass(imagenes[i], 'noneevents');
        this.renderer.removeClass(imagenes[i], 'activo');
        this.renderer.appendChild(preview, imagenes[i]);
      }
    }

    this.renderer.listen(close, 'click', cerrar);

    this.renderer.listen(window, 'keydown', (e) => {
      if(e.key==="Escape"){
        cerrar();
      }
    });

    let intervalo = setInterval(() => {
      if (div.getBoundingClientRect().top < -20) {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        clearInterval(intervalo);
      }
    }, 1000);
  }

  seeMore(event: any){
    let hermano = event.target.previousElementSibling;
    if(!hermano.style.display){
      this.renderer.setAttribute(hermano, "style", "display:block; height: auto;");
      this.renderer.setProperty(event.target, 'innerHTML', 'See less');
    } else {
      this.renderer.removeAttribute(hermano, "style");
      this.renderer.setProperty(event.target, 'innerHTML', 'See more');
   }
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2].forEach(e => e?.unsubscribe());
  }
}
