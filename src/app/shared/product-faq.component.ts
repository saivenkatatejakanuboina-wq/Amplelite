import { Component, computed, input, inject } from '@angular/core';
import type { MsgKey } from '../i18n';
import { I18nService } from '../i18n.service';
import { ScrollRevealDirective } from './scroll-reveal.directive';

export type FaqKind = 'general' | 'qms' | 'dms' | 'lms';

@Component({
  selector: 'app-product-faq',
  imports: [ScrollRevealDirective],
  template: `
    <section class="product-faq" [attr.data-kind]="kind()" aria-labelledby="page-faq-title">
      <div class="faq-inner">
        <div class="faq-copy" alScrollReveal>
          <p class="faq-kicker">{{ i18n.t(kind() === 'general' ? 'faq.overline' : 'cap.faq.overline') }}</p>
          <h2 id="page-faq-title">{{ i18n.t(kind() === 'general' ? 'faq.h1' : 'cap.faq.h2') }}</h2>
          <p class="faq-lede">{{ lede() }}</p>
        </div>
        <div class="faq-list al-reveal-stagger">
          @for (item of items(); track item.q; let i = $index) {
            <details class="faq-item" (toggle)="onToggle($event)" alScrollReveal [delay]="i * 40">
              <summary>
                <span class="faq-q">{{ item.q }}</span>
                <span class="faq-chevron" aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </summary>
              <div class="faq-answer">
                <p>{{ item.a }}</p>
              </div>
            </details>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './product-faq.css',
})
export class ProductFaqComponent {
  readonly kind = input<FaqKind>('general');
  readonly i18n = inject(I18nService);

  readonly lede = computed(() => {
    const kind = this.kind();
    if (kind === 'general') return this.i18n.t('faq.lede');
    return this.i18n.t(`cap.${kind}.faq.lede` as MsgKey);
  });

  readonly items = computed(() => {
    const kind = this.kind();
    const prefix = kind === 'general' ? 'faq' : `cap.${kind}.faq`;
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => {
      if (kind === 'general' && n > 5) return false;
      if (kind !== 'general' && n > 4) return false;
      return true;
    }).map((n) => ({
      q: this.i18n.t(`${prefix}.q${n}` as MsgKey),
      a: this.i18n.t(`${prefix}.a${n}` as MsgKey),
    }));
  });

  onToggle(event: Event): void {
    const target = event.target as HTMLDetailsElement;
    if (!target.open) return;
    const list = target.closest('.faq-list');
    list?.querySelectorAll('details[open]').forEach((el) => {
      if (el !== target) (el as HTMLDetailsElement).open = false;
    });
  }
}
