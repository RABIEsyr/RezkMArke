import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appAnimateRezk]'
})
export class AnimateRezkDirective {

  constructor() { }

  @HostListener('@rmAnimate')
    animateRM() {

    }
}
