import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PaintingsService]
})
export class HomeComponent implements OnInit {

  public principal: string;
  public subtitulo: string;

  public paintings: Paintings[];
  public url: string;

  constructor(
    private _paintingsService: PaintingsService
  ) {
    this.principal = "Artworks";
    this.subtitulo = "Buying art is buying time of the artist's life.";
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._paintingsService.getPaintings().subscribe(
      response => {
        if (response.paints) {
          this.paintings = response.paints;
        } else{
          
        }
      },
      error => {
        console.log(error);
      }
    );
}

}