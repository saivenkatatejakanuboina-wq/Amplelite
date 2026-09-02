import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[alScrollReveal]',
  host: {
    class: 'al-reveal',
    '[class.al-visible]': 'visible()',
    '[style.--reveal-delay]': 'delay() + "ms"',
    '[attr.data-reveal-stagger]': 'stagger() >= 0 ? stagger() : null',
  },
})
export class ScrollRevealDirective {
  readonly delay = input(0, { transform: numberAttribute });
  readonly stagger = input(-1, { transform: numberAttribute });
  readonly threshold = input(0.12, { transform: numberAttribute });

  readonly visible = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) {
        this.visible.set(true);
        return;
      }

      const el = this.host.nativeElement;
      const reveal = () => this.visible.set(true);

      if (typeof IntersectionObserver === 'undefined') {
        reveal();
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io.disconnect();
          }
        },
        { threshold: this.threshold(), rootMargin: '0px 0px -40px 0px' },
      );

      io.observe(el);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        reveal();
        io.disconnect();
      }
    });
  }
}
