import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public event: Subscription;
  public isBrowser!: boolean;
  @ViewChild('animationRoute', { static: false }) public animationRoute: ElementRef;

  constructor(
    private readonly router: Router,
    private readonly renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.event = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.renderer.removeClass(this.animationRoute?.nativeElement, 'router-animation');
      } else if (event instanceof NavigationEnd) {
        this.renderer.addClass(this.animationRoute?.nativeElement, 'router-animation');
      }
    });
  }

  ngOnDestroy(): void {
    this.event?.unsubscribe();
  }
}
