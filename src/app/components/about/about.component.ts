import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, OnDestroy {
  public principal: string;
  public parrafo: string;
  public alt: string;
  public animation: boolean = false;

  constructor(private titleService: Title, private metaService: Meta) {
    this.principal = 'About us';
    this.parrafo =
      'Birello Gallery is an emerging familiar business searching for the best products thinking in quality, value and exquisiteness. The products we offer not only delight customers regarding decorative value but also considering art itself as an investment for the future.';
    this.alt = 'About us display image';
    this.titleService.setTitle('About | Birello Gallery');
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | About',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content:
        'Birello Gallery is an emerging familiar business searching for the best products thinking in quality, value and exquisiteness. The products we offer not only delight customers regarding decorative value but also considering art itself as an investment for the future.',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/about',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | About',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content:
        'Birello Gallery is an emerging familiar business searching for the best products thinking in quality, value and exquisiteness. The products we offer not only delight customers regarding decorative value but also considering art itself as an investment for the future.',
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/about',
    });
  }

  ngOnInit(): void {
    this.animation = true;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.animation = false;
  }
}
