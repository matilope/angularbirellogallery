import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren, } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Global } from '@global/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PaintingsService],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public principal: string;
  public subtitulo: string;

  public paintings: Painting[];
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;
  public suscripcion3: Subscription;

  public currentPage: number = 1;
  public totalPages: number;
  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  public observer: IntersectionObserver;

  public loader: boolean = false;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private paintingService: PaintingsService
  ) {
    this.principal = 'Artworks';
    this.subtitulo = "Buying art is buying time of the artist's life.";
    this.url = Global.url;
    this.titleService.setTitle("Artworks | Birello Gallery");
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
    this.loader = true;
    this.suscripcion = this.paintingService
      .getPaintingsPagination(this.currentPage).subscribe({
        next: (response) => {
          this.loader = false;
          this.paintings = response.paints.sort(() => {
            return 0.5 - Math.random();
          });
          this.totalPages = response.results.total;
        },
      });
    this.intersectionObserver();
  }

  ngAfterViewInit(): void {
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
      threshold: 0
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
    this.loader = false;
  }
}
