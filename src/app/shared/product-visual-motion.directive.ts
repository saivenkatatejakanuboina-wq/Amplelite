import {
  Directive,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[alProductVisual]',
  host: {
    class: 'pv-root',
    '[class.pv-visible]': 'visible()',
    '[class.pv-active]': 'active()',
    '[style.--mx]': 'mouseX()',
    '[style.--my]': 'mouseY()',
    '[style.--scroll-y]': 'scrollShift() + "px"',
    '[style.--scroll-scale]': 'scrollScale()',
  },
})
export class ProductVisualMotionDirective {
  readonly visible = signal(false);
  readonly active = signal(false);
  readonly mouseX = signal(0);
  readonly mouseY = signal(0);
  readonly scrollShift = signal(0);
  readonly scrollScale = signal(1);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private reduced = false;

  constructor() {
    afterNextRender(() => this.init());
  }

  private init(): void {
    if (!this.isBrowser) {
      this.visible.set(true);
      this.active.set(true);
      return;
    }

    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reduced) {
      this.visible.set(true);
      this.active.set(true);
      return;
    }

    const el = this.host.nativeElement;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          this.visible.set(true);
          window.setTimeout(() => this.active.set(true), 200);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -20px 0px' },
    );
    io.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      this.visible.set(true);
      window.setTimeout(() => this.active.set(true), 200);
      io.disconnect();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.reduced) return;
    const rect = this.host.nativeElement.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    this.mouseX.set(Math.max(-1, Math.min(1, x)));
    this.mouseY.set(Math.max(-1, Math.min(1, y)));
  }

  @HostListener('mouseleave')
  resetMouse(): void {
    this.mouseX.set(0);
    this.mouseY.set(0);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (!this.isBrowser || this.reduced) return;
    const rect = this.host.nativeElement.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const progress = Math.min(1, Math.max(0, (vh * 0.35 - rect.top) / (vh * 0.5)));
    this.scrollShift.set(-progress * 14);
    this.scrollScale.set(1 - progress * 0.04);
  }
}
