import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Instagram } from '../../models/instagram';
import { InstagramService } from '../../services/instagram.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { Token } from '../../models/token';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css'],
  providers: [InstagramService],
})
export class MiscellaneousComponent implements OnInit, AfterViewInit, OnDestroy {
  public principal: string;
  public insta: Instagram[];

  public token: Token;
  private tokenId: string;
  public next: string;

  public suscripcion: any;
  public suscripcion2: any;
  public suscripcion3: any;
  public suscripcion4: any;

  public url: string;
  public content: string;

  public animation: boolean = false;

  @ViewChildren('theLastList', { read: ElementRef })
  theLastList: QueryList<ElementRef>;

  observer: any;

  public loader: boolean = false;

  public data: any;

  constructor(
    private _instagramService: InstagramService,
    private _router: Router,
    private titleService: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute
  ) {

    this.principal = 'Instagram of Birello Gallery';
    titleService.setTitle('Miscellaneous | Birello Gallery');
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
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.loader = true;
    // this.tokenId = '625b1c29ac7355062c33afe1';
    this.suscripcion = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.token) {
          this.animation = true;
          this.token = response.token.token._id;
          this.content = response.token.token.token;
          this.suscripcion2 = this._instagramService
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
    this.suscripcion3 = this.theLastList.changes.subscribe({
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
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (this.data.length > 1) {
          this.loader = true;
          this.suscripcion4 = this._instagramService
            .getInstagramNext(this.content, this.next)
            .subscribe({
              next: (response) => {
                this.loader = false;
                if (response.paging) {
                  this.next = response.paging.cursors.after;
                  this.data = response.data;
                  response.data.forEach((e) => {
                    this.insta.push(e);
                  });
                } else {
                  this.data=[];
                }
              }
            })
        }
      }
    }, options);
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2, this.suscripcion3, this.suscripcion4].forEach(e => e?.unsubscribe());
    this.animation = false;
    this.loader = false;
  }
}
