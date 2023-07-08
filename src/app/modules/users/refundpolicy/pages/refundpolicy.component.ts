import { Component  } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-refundpolicy',
  templateUrl: './refundpolicy.component.html',
  styleUrls: ['./refundpolicy.component.scss'],
})
export class RefundpolicyComponent {
  public title: string;

  constructor(private titleService: Title, private metaService: Meta) {
    this.title = 'IMPORTANT, PLEASE READ CAREFULLY';
    this.titleService.setTitle('Refund Policy | Birello Gallery');
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Refund Policy',
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Read our refund policy',
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/refundpolicy',
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Refund policy',
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Read our Refund policy',
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/refundpolicy',
    });
  }
}
