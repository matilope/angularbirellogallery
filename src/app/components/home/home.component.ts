import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, PipeTransform, QueryList, ViewChildren, } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Paintings } from 'src/app/models/paintings';
import { PaintingsService } from 'src/app/services/paintings.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PaintingsService],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public principal: string;
  public subtitulo: string;

  public paintings: Paintings[];
  public url: string;
  public suscripcion: any;
  public suscripcion2: any;
  public suscripcion3: any;

  public animation: boolean = false;

  public currentPage: number = 1;
  public totalPages: number;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  observer: IntersectionObserver;

  public loader: boolean = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private paintingService: PaintingsService
  ) {
    this.principal = 'Artworks';
    this.subtitulo = "Buying art is buying time of the artist's life.";
    this.url = Global.url;
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Artworks',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.subtitulo,
    });
    this.metaService.updateTag({
      name: 'keywords',
      content:
        'Buying art, investments, art investments, gallery, birello, birello gallery',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Artworks',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: this.subtitulo,
    });
  }

  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    //  window.addEventListener('scroll', function () {
    //    let card = document.querySelectorAll('.card');
    //    for (let i = 6; i < card.length; i++) {
    //      let position = card[i].getBoundingClientRect().top;
    //      let screen = window.innerHeight;
    //      if (position < screen) {
    //        card[i].classList.add('animacion');
    //      } else {
    //        card[i].classList.remove('animacion');
    //      }
    //    }
    //  });

    this.loader = true;
    this.suscripcion = this.paintingService
      .getPaintingsPagination(this.currentPage).subscribe({
        next: (response) => {
          this.animation = true;
          this.loader = false;
          this.paintings = response.paints.sort(() => {
            return 0.5 - Math.random();
          });
          this.totalPages = response.results.total;
        },
      });

    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.suscripcion3 = this.theLastList.changes.subscribe({
      next: (response) => {
        if (response.last) {
          this.observer.observe(response.last.nativeElement);
        }
      },
    });
  }

  paintingsData(): any {
    this.loader = true;
    this.suscripcion2 = this.paintingService
      .getPaintingsPagination(this.currentPage)
      .subscribe({
        next: (response) => {
          this.loader = false;
          response.paints.sort(() => {
            return 0.5 - Math.random();
          }).forEach((e) => {
            this.paintings.push(e);
          });
          this.totalPages = response.results.total;
        },
      });
  }

  intersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
          this.paintingsData();
        }
      }
    }, options);

  }

  ngOnDestroy(): void {
    [this.suscripcion, this.suscripcion2, this.suscripcion3].forEach(e => e?.unsubscribe());
    this.animation = false;
    this.loader = false;
  }
}
