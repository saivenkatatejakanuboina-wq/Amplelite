import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';

@Component({
  selector: 'app-product-roadmap',
  imports: [RouterLink],
  template: `
    <section
      class="ecosystem"
      [class.visible]="visible()"
      [class.hover-qms]="hover() === 'qms'"
      [class.hover-dms]="hover() === 'dms'"
      [class.hover-lms]="hover() === 'lms'"
      aria-label="AmpleLite digital quality platform"
    >
      <div class="wrap">
        <p class="sec-num">{{ i18n.t('home.sec.journey') }}</p>
        <div class="section-head">
          <h2>{{ i18n.t('home.journey.h2') }}</h2>
          <p class="intro">{{ i18n.t('home.journey.intro') }}</p>
        </div>

        <div class="eco-shell">
          <div class="eco-bg">
            <span class="eco-glow"></span>
            <span class="eco-grid"></span>
          </div>

          <div class="eco-canvas">
            <svg class="eco-links" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="eco-grad-out" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="#35BFE3" />
                  <stop offset="100%" stop-color="#1677A8" />
                </linearGradient>
                <linearGradient id="eco-grad-in" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="#1677A8" stop-opacity=".45" />
                  <stop offset="100%" stop-color="#35BFE3" stop-opacity=".75" />
                </linearGradient>
              </defs>

              <path class="link link-out link-qms" d="M500 175 C390 230, 280 300, 210 390" />
              <path class="link link-out link-dms" d="M500 175 C610 230, 720 300, 790 390" />
              <path class="link link-in link-in-qms" d="M210 390 C280 300, 410 220, 500 175" />
              <path class="link link-in link-in-dms" d="M790 390 C720 300, 590 220, 500 175" />

              <circle class="link-node n-qms" cx="210" cy="390" r="5" />
              <circle class="link-node n-dms" cx="790" cy="390" r="5" />

              <circle class="particle p-out-qms" r="3" />
              <circle class="particle p-out-dms" r="3" />
              <circle class="particle p-in-qms" r="2.5" />
              <circle class="particle p-in-dms" r="2.5" />
            </svg>

            <div class="eco-core">
              <span class="eco-ring"></span>
              <span class="eco-ring eco-ring-2"></span>
              <div class="eco-core-body">
                <b>AmpleLite</b>
                <span>Digital Quality<br />Platform</span>
                <em>● LIVE</em>
              </div>
            </div>

            <span class="eco-stem" aria-hidden="true"></span>

            <a
              class="product-module mod-qms"
              routerLink="/products/quality-management"
              (mouseenter)="setHover('qms')"
              (mouseleave)="setHover(null)"
            >
              <header class="pm-header">
                <span class="pm-badge qms">QMS</span>
                <div class="pm-title">
                  <b>Quality Management</b>
                  <small>Change · Deviation · CAPA</small>
                </div>
              </header>
              <div class="pm-content">
                <div class="pm-metric">
                  <em>QMS</em>
                  <span>Defined workflow</span>
                </div>
                <svg class="pm-spark" viewBox="0 0 140 24" preserveAspectRatio="none">
                  <path d="M0 20 L24 17 L48 14 L72 11 L96 8 L120 5 L140 3" />
                </svg>
              </div>
              <footer class="pm-status pm-split">
                <span>CAPA</span>
                <span>Deviations</span>
              </footer>
            </a>

            <a
              class="product-module mod-dms"
              routerLink="/products/document-management"
              (mouseenter)="setHover('dms')"
              (mouseleave)="setHover(null)"
            >
              <header class="pm-header">
                <span class="pm-badge dms">DMS</span>
                <div class="pm-title">
                  <b>Document Management</b>
                  <small>Document Control</small>
                </div>
              </header>
              <div class="pm-content">
                <div class="pm-doc">
                  <b>SOP-001</b>
                  <em>Version 3.2</em>
                </div>
                <div class="pm-version-track" aria-hidden="true">
                  <i></i><i></i><i class="on"></i>
                </div>
              </div>
              <footer class="pm-status pm-flow">
                <span class="done">✓ Reviewed</span>
                <span class="done">✓ Approved</span>
                <span class="on">● Controlled</span>
              </footer>
            </a>

            <a
              class="product-module mod-lms"
              routerLink="/products/learning-management"
              (mouseenter)="setHover('lms')"
              (mouseleave)="setHover(null)"
            >
              <header class="pm-header">
                <span class="pm-badge lms">LMS</span>
                <div class="pm-title">
                  <b>Learning Management</b>
                  <small>Training · Assessment</small>
                </div>
              </header>
              <div class="pm-content">
                <div class="pm-course">
                  <b>GMP Training</b>
                  <span class="pm-course-sub">Assigned learning path</span>
                </div>
                <svg class="pm-spark pm-spark-lms" viewBox="0 0 140 24" preserveAspectRatio="none">
                  <path d="M0 20 L28 20 L28 12 L72 12 L72 5 L140 5" />
                </svg>
                <div class="pm-version-track lms-track" aria-hidden="true">
                  <i class="on"></i><i class="on"></i><i class="on"></i>
                </div>
              </div>
              <footer class="pm-status pm-flow">
                <span class="done">✓ Assigned</span>
                <span class="done">✓ In session</span>
                <span class="on">● Complete</span>
              </footer>
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './product-roadmap.css',
})
export class ProductRoadmapComponent {
  readonly i18n = inject(I18nService);
  readonly visible = signal(false);
  readonly hover = signal<'qms' | 'dms' | 'lms' | null>(null);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) {
        this.visible.set(true);
        return;
      }
      const target = this.host.nativeElement.querySelector('.ecosystem') as HTMLElement | null;
      if (!target) return;
      const reveal = () => this.visible.set(true);
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            reveal();
            io.disconnect();
          }
        },
        { threshold: 0.08, rootMargin: '40px 0px' },
      );
      io.observe(target);
      if (target.getBoundingClientRect().top < window.innerHeight * 0.92) {
        reveal();
        io.disconnect();
      }
    });
  }

  setHover(id: 'qms' | 'dms' | 'lms' | null): void {
    this.hover.set(id);
  }
}
