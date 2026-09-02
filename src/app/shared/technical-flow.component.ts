import {
  afterNextRender,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { CapabilityKey } from '../capability-page.component';
import { I18nService } from '../i18n.service';
import { FlowIconComponent } from './flow-icon.component';

@Component({
  selector: 'app-technical-flow',
  imports: [FlowIconComponent],
  templateUrl: './technical-flow.html',
  styleUrl: './technical-flow.css',
  host: { '[attr.data-product]': 'product()' },
})
export class TechnicalFlowComponent {
  readonly i18n = inject(I18nService);
  readonly product = input.required<CapabilityKey>();
  readonly visible = signal(false);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    effect(() => {
      this.product();
      this.visible.set(false);
      if (!this.isBrowser) {
        this.visible.set(true);
        return;
      }
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => this.visible.set(true));
      });
      return () => cancelAnimationFrame(id);
    });

    afterNextRender(() => {
      if (!this.isBrowser) return;
      const el = this.host.nativeElement.querySelector('.tech-flow') as HTMLElement | null;
      const target = el ?? this.host.nativeElement;
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
        { threshold: 0.05, rootMargin: '80px 0px' },
      );
      io.observe(target);
      // Fallback: always reveal after paint so content is never hidden
      requestAnimationFrame(reveal);
    });
  }
}
