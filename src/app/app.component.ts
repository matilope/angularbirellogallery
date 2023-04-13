import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public scrollEvent: Subscription;
  public animation: boolean = false;

  @ViewChild('animationRoute') public animationRoute: ElementRef;
  
  constructor(private readonly router: Router, private readonly renderer: Renderer2) {
    this.scrollEvent = this.router.events.subscribe({
      next: () => {
        const element: HTMLElement = this.animationRoute.nativeElement.nextElementSibling.children[0];
        this.renderer.addClass(element, "router-animation");
        window.scrollBy(0, 0);
      }
    });
  }

  ngOnDestroy(): void {
    this.scrollEvent.unsubscribe();
    this.animation = false;
  }

}
