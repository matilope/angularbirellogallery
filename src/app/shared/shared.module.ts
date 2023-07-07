import { NgModule } from '@angular/core';
import { ImgBrokenDirective } from './directives/img-broken.directive';

@NgModule({
  declarations: [ ImgBrokenDirective ],
  exports: [ ImgBrokenDirective ]
})
export class SharedModule { }