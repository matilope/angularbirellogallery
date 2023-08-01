import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
  standalone: true
})
export class ImgBrokenDirective {
  constructor(private readonly imgHost: ElementRef, private readonly renderer: Renderer2) { }

  @HostListener('error') public handleError(): void {
    this.renderer.setAttribute(this.imgHost.nativeElement, 'src', '/assets/img/default/default.png');
  }
}
