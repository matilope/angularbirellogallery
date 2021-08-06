import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Instagram } from '../../models/instagram';
import { InstagramService } from '../../services/instagram.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-miscellaneous',
  templateUrl: './miscellaneous.component.html',
  styleUrls: ['./miscellaneous.component.css'],
  providers: [InstagramService]
})
export class MiscellaneousComponent implements OnInit {
  public principal: string;
  public insta: Instagram[];
  public instasecond: Instagram[];
  page: number;

  constructor(
    private _instagramService: InstagramService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.principal = "Instagram of Birello Gallery";
    titleService.setTitle("Miscellaneous | Birello Gallery");
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Miscellaneous'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: 'Instagram of Birello Gallery, full of amazing paintings'
    });
    this.metaService.updateTag({
      property: 'og:url',
      content: 'https://www.birellogallery.com/miscellaneous'
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Miscellaneous'
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: 'Instagram of Birello Gallery, full of amazing paintings'
    });
    this.metaService.updateTag({
      property: 'twitter:url',
      content: 'https://www.birellogallery.com/miscellaneous'
    });
  }

  ngOnInit(): void {

    this._instagramService.getInstagram().subscribe(
      response => {
        if (response) {
          this.insta = response.data;
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  pageChanged(page) {
    window.scrollTo(240, 240);
  }

}
