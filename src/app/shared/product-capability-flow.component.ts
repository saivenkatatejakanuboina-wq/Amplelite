import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import type { FlowIconName } from './flow-icon.component';
import { FlowIconComponent } from './flow-icon.component';
import { ScrollRevealDirective } from './scroll-reveal.directive';

export type CapabilityFlowKind = 'qms' | 'dms' | 'lms';

export type CapabilityFeature = {
  title: string;
  body: string;
};

const FEATURE_ICONS: Record<CapabilityFlowKind, FlowIconName[]> = {
  qms: ['medal', 'activity', 'sliders', 'warn', 'check', 'review'],
  dms: ['doc', 'template', 'upload', 'revision', 'print', 'audit'],
  lms: ['book', 'assign', 'classroom', 'video', 'report', 'cap', 'readiness'],
};

@Component({
  selector: 'app-product-capability-flow',
  imports: [FlowIconComponent, ScrollRevealDirective],
  templateUrl: './product-capability-flow.html',
  styleUrl: './product-capability-flow.css',
})
export class ProductCapabilityFlowComponent {
  readonly kind = input.required<CapabilityFlowKind>();
  readonly features = input.required<CapabilityFeature[]>();

  readonly activeIndex = signal(0);
  readonly chartVisible = signal(false);

  private cycleStarted = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement.querySelector('.cap-cover');
      if (!el || typeof IntersectionObserver === 'undefined') {
        this.chartVisible.set(true);
        this.startCycle();
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          this.chartVisible.set(visible);
          if (visible) this.startCycle();
        },
        { threshold: 0.2 },
      );
      this.observer.observe(el);
      this.destroyRef.onDestroy(() => this.observer?.disconnect());
    });
  }

  iconAt(index: number): FlowIconName {
    const icons = FEATURE_ICONS[this.kind()];
    return icons[index] ?? 'check';
  }

  stepNum(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  spineProgress(): number {
    const count = this.features().length;
    if (count <= 1) return 100;
    return (this.activeIndex() / (count - 1)) * 100;
  }

  selectIndex(index: number): void {
    this.activeIndex.set(index);
  }

  private startCycle(): void {
    if (this.cycleStarted) return;
    this.cycleStarted = true;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    interval(2800)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.chartVisible()) return;
        const next = (this.activeIndex() + 1) % this.features().length;
        this.activeIndex.set(next);
      });
  }
}
