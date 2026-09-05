import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  inject,
} from '@angular/core';

type RevealOrigin = 'up' | 'down' | 'left' | 'right';

@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly renderer = inject(Renderer2);
  private observer?: IntersectionObserver;

  @Input() revealDelay = 0;
  @Input() revealOrigin: RevealOrigin = 'up';

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;

    this.renderer.addClass(element, 'reveal');
    this.renderer.addClass(element, `reveal--${this.revealOrigin}`);

    if (this.revealDelay > 0) {
      this.renderer.setStyle(element, 'transition-delay', `${this.revealDelay}ms`);
    }

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      this.show(element);
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.show(element);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            this.show(target);
          } else {
            this.hide(target);
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private show(element: HTMLElement): void {
    this.renderer.addClass(element, 'is-visible');
  }

  private hide(element: HTMLElement): void {
    this.renderer.removeClass(element, 'is-visible');
  }
}
