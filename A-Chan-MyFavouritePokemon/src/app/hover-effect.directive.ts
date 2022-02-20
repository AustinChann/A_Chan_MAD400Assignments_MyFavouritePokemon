import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHoverEffect]'
})
export class HoverEffectDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseover') onHover() {
    this.hoverEffect()
  }

  @HostListener('mouseout') offHover() {
    this.el.nativeElement.style.fontWeight = 'normal';
    this.el.nativeElement.style.textDecoration = null;
  }

  private hoverEffect() {
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.textDecoration = 'underline';
  }
}
