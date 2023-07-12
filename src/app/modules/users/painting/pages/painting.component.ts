import { Component, OnDestroy, OnInit } from '@angular/core';
import { Painting } from '@core/models/painting';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '@global/global';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.scss'],
  providers: []
})
export class PaintingComponent implements OnInit, OnDestroy {
  public jsonLD: Object;
  public html: SafeHtml;
  public painting: Painting;
  public url: string;
  public subscription: Subscription;
  public subscription2: Subscription;
  public link: string | string[];
  public link2: string | string[];
  public imageSelected!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.subscription2 = this.activatedRoute.data.subscribe({
      next: response => {
        if (response.painting.paint) {
          this.painting = response.painting.paint;
          this.imageSelected = this.painting.image0url;
          this.titleService.setTitle(this.painting.title);

          if (response.painting.paint.link.length > 2) {
            if (response.painting.paint.link.includes('http://')) {
              this.link = response.painting.paint.link.split('http://');
            } else {
              this.link = response.painting.paint.link.split('https://');
            }
            this.link = this.link[1].split('/')[0];
          }

          if (response.painting.paint.link2.length > 2) {
            if (response.painting.paint.link.includes('http://')) {
              this.link2 = response.painting.paint.link2.split('http://');
            } else {
              this.link2 = response.painting.paint.link2.split('https://');
            }
            this.link2 = this.link2[1].split('/')[0];
          }

          this.metaService.updateTag({
            property: 'og:title',
            content: 'Birello Gallery | ' + this.painting.title,
          });
          this.metaService.updateTag({
            property: 'og:description',
            content: this.painting.description.split(".")[0],
          });
          this.metaService.updateTag({
            property: 'og:image',
            content: this.painting.image0url,
          });
          this.metaService.updateTag({
            property: 'og:url',
            content:
              'https://www.birellogallery.com/painting/view/' +
              this.painting._id,
          });
          this.metaService.updateTag({
            name: 'keywords',
            content: this.painting.title + ', ' + this.painting.subtitle,
          });
          this.metaService.updateTag({
            property: 'twitter:title',
            content: 'Birello Gallery | ' + this.painting.title,
          });
          this.metaService.updateTag({
            property: 'twitter:description',
            content: this.painting.description.split(".")[0],
          });
          this.metaService.updateTag({
            property: 'twitter:image',
            content: this.painting.image0url,
          });
          this.metaService.updateTag({
            property: 'twitter:url',
            content:
              'https://www.birellogallery.com/painting/view/' +
              this.painting._id,
          });
        } else {
          this._router.navigate(['/']);
        }
      }
    });
    this.jsonLD = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.painting.title,
      "description": this.painting.description.split(".")[0],
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": Math.random() * (4.9 - 4.5) + 4.5,
          "bestRating": 5
        },
        "author": {
          "@type": "Person",
          "name": "John"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Math.random() * (4.9 - 4.3) + 4.3,
        "reviewCount": Math.floor(Math.random() * (20 - 10) + 10)
      }
    };
    this.html = this.getSafeHTML(this.jsonLD);
  }

  changeImage(i: number) {
    this.imageSelected = this.painting[`image${i}url`];
  }

  getSafeHTML(jsonLD: { [key: string]: any }): SafeHtml {
    const json = jsonLD ? JSON.stringify(jsonLD, null, 2).replace(/<\/script>/g, '<\\/script>') : '';
    const html = `<script type="application/ld+json">${json}</script>`;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  ngOnDestroy(): void {
    [this.subscription, this.subscription2].forEach(e => e?.unsubscribe());
  }
}
