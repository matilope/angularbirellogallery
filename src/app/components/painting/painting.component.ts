import { Component, OnInit } from '@angular/core';
import { Paintings } from '../../models/paintings';
import { PaintingsService } from '../../services/paintings.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-painting',
  templateUrl: './painting.component.html',
  styleUrls: ['./painting.component.css'],
  providers: [PaintingsService]
})
export class PaintingComponent implements OnInit {

  public paintings: Paintings;
  public url: string;

  constructor(
    private _paintingsService: PaintingsService,
    private _route: ActivatedRoute,
    private _router: Router,

  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let pinturaId = params['id'];
      this._paintingsService.getPainting(pinturaId).subscribe(
        response => {
          if (response.paints) {
            this.paintings = response.paints;
          } else {
            this._router.navigate(["/"]);

          }
        },
        error => {
          this._router.navigate(["/"]);
        }
      );
    });
  }
  
}