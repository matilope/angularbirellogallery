import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  public routerEvent: Subscription;

  @ViewChild('nav') public nav: ElementRef;
  @ViewChild('menu') public menu: ElementRef;
  @ViewChild('navLinks') public navLinks: ElementRef;
  @ViewChild('button') public button: ElementRef;

  constructor(
    private _portraitService: PortraitService,
    private router: Router,
    private location: Location,
    private readonly renderer: Renderer2
  ) {
    this.routerEvent = this.router.events.subscribe(() => {
      this.path = this.location.path();
    });
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._portraitService.getPortraits().subscribe({
      next: response => {
        if (response.portrait) {
          this.portrait = response.portrait;
        }
      },
    });
    this.resizeListener();
    this.scrollListener();
  }

  ngOnDestroy(): void {
    this.routerEvent.unsubscribe();
  }

  public scrollListener(): void {
    this.renderer.listen(window, "scroll", () => {
      if (this.nav.nativeElement.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].getBoundingClientRect().top > 82) {
        if (!this.button.nativeElement.classList.contains("open")) {
          this.renderer.removeClass(this.nav.nativeElement, "bg-customize-nav");
        }
      } else {
        this.renderer.addClass(this.nav.nativeElement, "bg-customize-nav");
      }
    });
  }

  public resizeListener(): void {
    this.renderer.listen(window, "resize", () => {
      if (this.menu.nativeElement.classList.contains("show")) {
        this.renderer.removeClass(this.menu.nativeElement, "show");
        this.renderer.removeAttribute(this.navLinks.nativeElement, "class");
        this.renderer.addClass(this.navLinks.nativeElement, "navbar-nav");
        this.renderer.removeClass(this.button.nativeElement, "open");
        if (this.nav.nativeElement.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].getBoundingClientRect().top > 82) {
          this.renderer.removeClass(this.nav.nativeElement, "bg-customize-nav");
        }
      }
    });
  }

  public collapse(): void {
    if (this.menu.nativeElement.classList.contains("show")) {
      this.renderer.removeClass(this.menu.nativeElement, "show");
      this.renderer.removeAttribute(this.navLinks.nativeElement, "class");
      this.renderer.addClass(this.navLinks.nativeElement, "navbar-nav");
      if (this.nav.nativeElement.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0].getBoundingClientRect().top > 82) {
        this.renderer.removeClass(this.nav.nativeElement, "bg-customize-nav");
      }
      this.renderer.removeClass(this.button.nativeElement, "open");
    } else {
      this.renderer.addClass(this.menu.nativeElement, "navAnimation");
      this.renderer.addClass(this.menu.nativeElement, "show");
      this.renderer.setAttribute(this.navLinks.nativeElement, "class", "navbar-nav flex-column align-items-center p-3");
      this.renderer.addClass(this.nav.nativeElement, "bg-customize-nav");
      this.renderer.addClass(this.button.nativeElement, "open");
      this.renderer.addClass(this.nav.nativeElement.parentElement.parentElement.nextElementSibling.nextElementSibling.children[0], "blur");
    }
    for (let i in Array.from(this.navLinks?.nativeElement?.children)) {
      this.renderer.listen(this.navLinks?.nativeElement?.children[i], "click", () => {
        if (this.menu.nativeElement.classList.contains("show")) {
          this.renderer.removeClass(this.menu.nativeElement, "show");
          this.renderer.removeAttribute(this.navLinks.nativeElement, "class");
          this.renderer.addClass(this.navLinks.nativeElement, "navbar-nav");
          this.renderer.removeClass(this.button.nativeElement, "open");
        }
      });
    }
  }
}
