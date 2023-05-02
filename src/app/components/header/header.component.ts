import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Portrait } from '../../models/portrait';
import { PortraitService } from '../../services/portrait.service';
import { Router } from '@angular/router';
import { Global } from '../../services/global';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [PortraitService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public path: string = '';
  public portrait: Portrait[];
  public url: string;
  public suscripcion: Subscription;
  public suscripcion2: Subscription;

  constructor(
    private _portraitService: PortraitService,
    private router: Router,
    private location: Location
  ) {
    this.suscripcion2 = this.router.events.subscribe(() => {
      this.path = this.location.path();
    });
    this.url = Global.url;
  }

  ngOnInit(): void {
    this.suscripcion = this._portraitService.getPortraits().subscribe({
      next: response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        }
      },
    });
  }

  ngOnDestroy() {
    [this.suscripcion, this.suscripcion2].forEach(e => e?.unsubscribe());
  }
}
