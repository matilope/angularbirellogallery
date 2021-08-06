import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Global } from '../../services/global';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PaintingsService]
})
export class HomeComponent implements OnInit {

  public principal: string;
  public subtitulo: string;

  public paintings: any
  public url: string;


  constructor(
    private _paintingsService: PaintingsService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.principal = "Artworks";
    this.subtitulo = "Buying art is buying time of the artist's life.";
    this.url = Global.url;
    this.metaService.updateTag({
      property: 'og:title',
      content: 'Birello Gallery | Artworks'
    });
    this.metaService.updateTag({
      property: 'og:description',
      content: this.subtitulo
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Buying art, investments, art investments, gallery, birello, birello gallery'
    });
    this.metaService.updateTag({
      property: 'twitter:title',
      content: 'Birello Gallery | Artworks'
    });
    this.metaService.updateTag({
      property: 'twitter:description',
      content: this.subtitulo
    });
  }

  ngOnInit(): void {
    this._paintingsService.getPaintings().subscribe(
      response => {
        if (response.paints) {
          this.paintings = Array.from(response.paints).sort(() => { return 0.5 - Math.random(); })
        } else {

        }
      },
      error => {
        console.log(error);
      }
    );
  }


}