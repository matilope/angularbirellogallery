import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Portrait } from '@core/models/portrait';
import { PortraitService } from '@shared/services/portrait.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  public path!: string;
  public portrait!: Portrait;
  public routerEvent: Subscription;
  public isLoggedIn: boolean = false;
  public subscription: Subscription;
  public excludedPaths: string[] = ['404', 'admin'];

  @ViewChild('navLinks') public navLinks: ElementRef;
  @ViewChild('button') public button: ElementRef;

  constructor(
    private _portraitService: PortraitService,
    private _authService: AuthService,
    private router: Router,
    private location: Location,
    private readonly renderer: Renderer2
  ) {
    this.routerEvent = this.router.events.subscribe(() => {
      this.path = this.location.path().split("/")[1];
    });
  }

  ngOnInit(): void {
    this.subscription = this._portraitService.getPortrait('64a4cb571625dd0281b55429').subscribe({
      next: response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        }
      }
    });
    this.isLoggedIn = this._authService.cookieExists();
  }

  ngAfterViewInit(): void {
    this.closeNavOnLinkTouch();
  }

  ngOnDestroy(): void {
    this.routerEvent?.unsubscribe();
    this.subscription?.unsubscribe();
  }

  public collapse(event: any): void {
    if(event.key == "Enter" || event.type == 'click') {
      if (this.button.nativeElement.classList.contains('active')) {
        this.renderer.removeClass(this.button.nativeElement, "active");
      } else {
        this.renderer.addClass(this.button.nativeElement, "active");
      }
      if (this.navLinks.nativeElement.classList.contains('show')) {
        this.renderer.removeClass(this.navLinks.nativeElement, "show");
      } else {
        this.renderer.addClass(this.navLinks.nativeElement, "show");
      }
    }
  }

  public closeNavOnLinkTouch(): void {
    for (const child of Array.from(this.navLinks.nativeElement.children)) {
      this.renderer.listen(child, 'click', () => {
        this.renderer.removeClass(this.button.nativeElement, "active");
        this.renderer.removeClass(this.navLinks.nativeElement, "show");
      });
    }
  }
}
