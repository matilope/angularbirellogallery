import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-refundpolicy',
  templateUrl: './refundpolicy.component.html',
  styleUrls: ['./refundpolicy.component.css'],
})
export class RefundpolicyComponent {
  public principal: string;
  public titulo: string;
  public text: string;
  public mail: string;
  public textextra: string;

  constructor(private titleService: Title, private metaService: Meta) {
    this.principal = 'Refund policy';
    this.titulo = 'IMPORTANT, PLEASE READ CAREFULLY';
    this.text = 'To return your product, please email us at';
    this.mail = 'ignaciobirello@hotmail.com';
    this.textextra =
      'You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund. You will receive a full refund excluding shipping costs.';
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
