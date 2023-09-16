import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-refundpolicy',
  templateUrl: './refundpolicy.component.html',
  styleUrls: ['./refundpolicy.component.scss'],
})
export class RefundpolicyComponent {
  public title: string;

  constructor(private metaService: Meta) {
    this.title = 'IMPORTANT, PLEASE READ CAREFULLY';
    this.metaService.addTag({
      name: 'robots',
      content: 'noindex, nofollow',
    });
  }
}
