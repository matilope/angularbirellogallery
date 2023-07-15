import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Painting } from '@core/models/painting';
import { PaintingsService } from '@shared/services/paintings.service';
import { Global } from '@global/global';
import { MessageService } from 'primeng/api';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PaintingsService, MessageService]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  public principal: string;
  public subtitulo: string;

  public paintings: Painting[];
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public subscription3: Subscription;
  public subscription4: Subscription;

  public currentPage: number = 1;
  public totalPages: number;
  @ViewChildren('theLastList', { read: ElementRef })
  public theLastList: QueryList<ElementRef>;

  public observer: IntersectionObserver;

  public loader: boolean = false;
  public search: string = '';
  private searchSubject: Subject<string> = new Subject<string>();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _paintingService: PaintingsService,
    private messageService: MessageService,
    private metaService: Meta
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
    this.loader = true;
    this.subscription = this._paintingService
      .getPaintingsPagination(this.currentPage).subscribe({
        next: (response) => {
          if (response.status == 'Success') {
            this.loader = false;
            this.paintings = response.paints;
            this.totalPages = response.results.total;
          }
        }
      });
    this.intersectionObserver();
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((searchTerm: string) => {
        if (searchTerm.length >= 4) {
          this.loader = true;
          this.subscription4 = this._paintingService.search(searchTerm).subscribe({
            next: (response) => {
              this.loader = false;
              if (response.status == 'Success' && response.paints.length > 0) {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'The search query has results' });
                this.paintings = response.paints;
              } else {
                this.messageService.add({ severity: 'warn', summary: 'Warning', detail: `The search query doesn't have results` });
              }
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'The search query failed, error code 500' });
              this.loader = false;
              this.resetSearch();
            }
          });
        }
      });
  }

  ngAfterViewInit(): void {
    this.subscription3 = this.theLastList.changes.subscribe({
      next: (response) => {
        if (response.last) {
          this.observer.observe(response.last.nativeElement);
        }
      },
    });
  }

  searchHttp(): void {
    this.searchSubject.next(this.search);
  }

  resetSearch(): void {
    this.currentPage = 1;
    this.search = '';
    this.paintings = [];
    this.paintingsData();
  }

  paintingsData(): void {
    this.loader = true;
    this.subscription2 = this._paintingService
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

  intersectionObserver(): void {
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
    [this.subscription, this.subscription2, this.subscription3, this.subscription4].forEach(e => e?.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }
}
