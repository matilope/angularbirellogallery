import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PortraitService]
})
export class HeaderComponent implements OnInit {

  path = '';
  public portrait: Portrait;
  public url: string;

  constructor(
    private _portraitService: PortraitService,
    private _route: ActivatedRoute,
    private _router: Router,
    private router: Router, 
    private location: Location) 
    {
    this.router.events.subscribe((val) => {
      this.path = this.location.path();
    });
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._portraitService.getPortraits().subscribe(
      response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        } else {
          
        }
      },
      error => {
        console.log(error);
      }
    );
}


}
