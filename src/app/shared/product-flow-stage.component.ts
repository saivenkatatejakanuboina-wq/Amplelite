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
import { I18nService } from '../i18n.service';

export type FlowStageKind = 'qms' | 'dms' | 'lms';

const FLOW_ICONS: Record<FlowStageKind, FlowIconName[]> = {
  qms: ['activity', 'sliders', 'review', 'check', 'eye'],
  dms: ['upload', 'review', 'check', 'control', 'eye'],
  lms: ['book', 'assign', 'classroom', 'check', 'readiness'],
};

@Component({
  selector: 'app-product-flow-stage',
  imports: [FlowIconComponent, ScrollRevealDirective],
  templateUrl: './product-flow-stage.html',
  styleUrl: './product-flow-stage.css',
})
export class ProductFlowStageComponent {
  readonly kind = input.required<FlowStageKind>();
  readonly steps = input.required<string[]>();
  readonly i18n = inject(I18nService);

  readonly activeStep = signal(0);
  readonly stageVisible = signal(false);

  private cycleStarted = false;
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement.querySelector('.flow-stage');
      if (!el || typeof IntersectionObserver === 'undefined') {
        this.stageVisible.set(true);
        this.startCycle();
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          const visible = entries.some((e) => e.isIntersecting);
          this.stageVisible.set(visible);
          if (visible) this.startCycle();
        },
        { threshold: 0.25 },
      );
      this.observer.observe(el);
      this.destroyRef.onDestroy(() => this.observer?.disconnect());
    });
  }

  iconAt(index: number): FlowIconName {
    return FLOW_ICONS[this.kind()][index] ?? 'check';
  }

  stepNum(index: number): string {
    return String(index + 1).padStart(2, '0');
  }

  selectStep(index: number): void {
    this.activeStep.set(index);
  }

  private startCycle(): void {
    if (this.cycleStarted) return;
    this.cycleStarted = true;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    interval(2600)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (!this.stageVisible()) return;
        const next = (this.activeStep() + 1) % this.steps().length;
        this.activeStep.set(next);
      });
  }
}
