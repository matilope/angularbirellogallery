import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Instagram } from '@core/models/instagram';
import { InstagramService } from '@shared/services/instagram.service';
import { ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Token } from '@core/models/token';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.scss'],
  providers: [InstagramService],
})
export class MiscellaneousComponent implements OnInit, AfterViewInit, OnDestroy {
  public insta: Instagram[];
  public token: Token;
  public next: string;

  private subscription: Subscription;
  private subscription2: Subscription;
  private subscription3: Subscription;
  private subscription4: Subscription;

  public url: string;
  public content: string;

  @ViewChildren('theLastList', { read: ElementRef })
  public theLastList: QueryList<ElementRef>;

  private observer: any;

  public loader: boolean = false;

  public data: any;

  constructor(
    private _instagramService: InstagramService,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {
    this.titleService.setTitle('Miscellaneous | Birello Gallery');
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Miscellaneous',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Instagram of Birello Gallery, full of amazing paintings',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/miscellaneous',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Miscellaneous',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Instagram of Birello Gallery, full of amazing paintings',
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/miscellaneous',
    });
  }


  ngOnInit(): void {
    this.loader = true;
    this.subscription = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.tokens.status === "Success") {
          this.token = response.tokens.tokens.token._id;
          this.content = response.tokens.tokens.token;
          this.subscription2 = this._instagramService
            .getInstagram(this.content)
            .subscribe({
              next: response => {
                this.loader = false;
                this.insta = response.data;
                this.data = response.data;
                if (response.paging.cursors.after) {
                  this.next = response.paging.cursors.after;
                }
              },
            });
        }
      },
    });
    this.intersectionObserver();
  }

  ngAfterViewInit() {
    this.subscription3 = this.theLastList.changes.subscribe({
      next: (response) => {
        if (response.last) {
          this.observer.observe(response.last.nativeElement);
        }
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
        if (this.data.length > 1) {
          this.loader = true;
          this.subscription4 = this._instagramService
            .getInstagramNext(this.content, this.next)
            .subscribe({
              next: (response) => {
                this.loader = false;
                if (response.paging) {
                  this.next = response.paging.cursors.after;
                  this.data = response.data;
                  response.data.forEach((e: any) => {
                    this.insta.push(e);
                  });
                } else {
                  this.data = [];
                }
              }
            })
        }
      }
    }, options);
  }

  ngOnDestroy() {
    [this.subscription, this.subscription2, this.subscription3, this.subscription4].forEach(e => e?.unsubscribe());
    this.loader = false;
  }
}
