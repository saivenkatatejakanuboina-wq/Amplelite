import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  HostListener,
  afterNextRender,
  ElementRef,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { MsgKey } from '../i18n';
import { I18nService } from '../i18n.service';

export type ProductKind = 'qms' | 'dms' | 'lms';

type SlideDef = {
  variant: string;
  titleKey: MsgKey;
  descKey: MsgKey;
};

const SLIDES: Record<ProductKind, SlideDef[]> = {
  qms: [
    { variant: 'qms-overview', titleKey: 'dash.qms.s1.title', descKey: 'dash.qms.s1.desc' },
    { variant: 'qms-activities', titleKey: 'dash.qms.s2.title', descKey: 'dash.qms.s2.desc' },
    { variant: 'qms-visibility', titleKey: 'dash.qms.s3.title', descKey: 'dash.qms.s3.desc' },
    { variant: 'qms-workflow', titleKey: 'dash.qms.s4.title', descKey: 'dash.qms.s4.desc' },
  ],
  dms: [
    { variant: 'dms-overview', titleKey: 'dash.dms.s1.title', descKey: 'dash.dms.s1.desc' },
    { variant: 'dms-workspace', titleKey: 'dash.dms.s2.title', descKey: 'dash.dms.s2.desc' },
    { variant: 'dms-review', titleKey: 'dash.dms.s3.title', descKey: 'dash.dms.s3.desc' },
    { variant: 'dms-control', titleKey: 'dash.dms.s4.title', descKey: 'dash.dms.s4.desc' },
  ],
  lms: [
    { variant: 'lms-overview', titleKey: 'dash.lms.s1.title', descKey: 'dash.lms.s1.desc' },
    { variant: 'lms-workspace', titleKey: 'dash.lms.s2.title', descKey: 'dash.lms.s2.desc' },
    { variant: 'lms-activities', titleKey: 'dash.lms.s3.title', descKey: 'dash.lms.s3.desc' },
    { variant: 'lms-progress', titleKey: 'dash.lms.s4.title', descKey: 'dash.lms.s4.desc' },
  ],
};

@Component({
  selector: 'app-dashboard-carousel',
  templateUrl: './dashboard-carousel.html',
  styleUrl: './dashboard-carousel.css',
  host: {
    '[attr.data-product]': 'product()',
    '[class.is-switching]': 'switching()',
    '[class.theme-dark]': 'dark()',
    '[class.visible]': 'visible()',
  },
})
export class DashboardCarouselComponent {
  readonly i18n = inject(I18nService);
  readonly product = input.required<ProductKind>();
  readonly compact = input(false);
  readonly previewOnly = input(false);
  readonly dark = input(false);

  readonly index = signal(0);
  readonly slideDir = signal<'next' | 'prev' | 'none'>('none');
  readonly switching = signal(false);
  readonly visible = signal(false);
  private touchX = 0;
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly slides = computed(() => SLIDES[this.product()]);
  readonly current = computed(() => this.slides()[this.index()] ?? this.slides()[0]);

  constructor() {
    effect(() => {
      this.product();
      this.index.set(0);
      this.slideDir.set('none');
      this.switching.set(true);
      const timer = setTimeout(() => this.switching.set(false), 480);
      return () => clearTimeout(timer);
    });

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
        { threshold: 0.1, rootMargin: '40px 0px' },
      );
      io.observe(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        reveal();
        io.disconnect();
      }
    });
  }

  prev(): void {
    const n = this.slides().length;
    this.slideDir.set('prev');
    this.index.update((i) => (i - 1 + n) % n);
  }

  next(): void {
    const n = this.slides().length;
    this.slideDir.set('next');
    this.index.update((i) => (i + 1) % n);
  }

  go(i: number): void {
    this.slideDir.set(i > this.index() ? 'next' : i < this.index() ? 'prev' : 'none');
    this.index.set(i);
  }

  onTouchStart(e: TouchEvent): void {
    this.touchX = e.changedTouches[0]?.clientX ?? 0;
  }

  onTouchEnd(e: TouchEvent): void {
    const x = e.changedTouches[0]?.clientX ?? 0;
    const d = x - this.touchX;
    if (Math.abs(d) < 40) return;
    if (d < 0) this.next();
    else this.prev();
  }

  @HostListener('keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
  }
}
