import { Component, ElementRef, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnDestroy {
  public event: Subscription;

  @ViewChild('animationRoute', { static: false }) public animationRoute: ElementRef;

  constructor(private readonly router: Router, private readonly renderer: Renderer2) {
    this.event = this.router.events.subscribe({
      next: () => {
        const element: HTMLElement = this.animationRoute?.nativeElement;
        this.renderer.addClass(element, "router-animation");
      }
    });
  }

  ngOnDestroy(): void {
    this.event?.unsubscribe();
  }

}
