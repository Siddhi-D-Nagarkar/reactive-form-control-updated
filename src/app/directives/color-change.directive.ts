import { Directive, ElementRef, HostListener, Renderer2, RendererStyleFlags2 } from '@angular/core';

@Directive({
  selector: '[appColorChange]',
})
export class ColorChangeDirective {
  constructor(private elementRef: ElementRef, private render: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.render.setStyle(this.elementRef.nativeElement, 'color', 'black',RendererStyleFlags2.Important);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.render.setStyle(this.elementRef.nativeElement, 'color', '',RendererStyleFlags2.Important);

  }
}
