import { Component, computed, inject, input, signal } from '@angular/core';
import type { MsgKey } from '../i18n';
import { I18nService } from '../i18n.service';
import type { ProductKind } from './dashboard-carousel.component';

type Slide = { titleKey: MsgKey; descKey: MsgKey };

const SLIDES: Record<ProductKind, Slide[]> = {
  qms: [
    { titleKey: 'dash.qms.s1.title', descKey: 'dash.qms.s1.desc' },
    { titleKey: 'dash.qms.s2.title', descKey: 'dash.qms.s2.desc' },
    { titleKey: 'dash.qms.s3.title', descKey: 'dash.qms.s3.desc' },
    { titleKey: 'dash.qms.s4.title', descKey: 'dash.qms.s4.desc' },
  ],
  dms: [
    { titleKey: 'dash.dms.s1.title', descKey: 'dash.dms.s1.desc' },
    { titleKey: 'dash.dms.s2.title', descKey: 'dash.dms.s2.desc' },
    { titleKey: 'dash.dms.s3.title', descKey: 'dash.dms.s3.desc' },
    { titleKey: 'dash.dms.s4.title', descKey: 'dash.dms.s4.desc' },
  ],
  lms: [
    { titleKey: 'dash.lms.s1.title', descKey: 'dash.lms.s1.desc' },
    { titleKey: 'dash.lms.s2.title', descKey: 'dash.lms.s2.desc' },
    { titleKey: 'dash.lms.s3.title', descKey: 'dash.lms.s3.desc' },
    { titleKey: 'dash.lms.s4.title', descKey: 'dash.lms.s4.desc' },
  ],
};

@Component({
  selector: 'app-product-showcase',
  templateUrl: './product-showcase.html',
  styleUrl: './product-showcase.css',
})
export class ProductShowcaseComponent {
  readonly i18n = inject(I18nService);
  readonly kind = input.required<ProductKind>();

  readonly index = signal(0);
  readonly slides = computed(() => SLIDES[this.kind()]);
  readonly current = computed(() => this.slides()[this.index()] ?? this.slides()[0]);

  prev(): void {
    const n = this.slides().length;
    this.index.update((i) => (i - 1 + n) % n);
  }

  next(): void {
    const n = this.slides().length;
    this.index.update((i) => (i + 1) % n);
  }

  go(i: number): void {
    this.index.set(i);
  }
}
