import { Component } from '@angular/core';
import { ProductVisualMotionDirective } from './product-visual-motion.directive';

@Component({
  selector: 'app-lms-product-visual',
  imports: [ProductVisualMotionDirective],
  template: `
    <div alProductVisual class="lms-pv" aria-hidden="true">
      <div class="pv-bg">
        <span class="pv-glow pv-glow-a"></span>
        <span class="pv-glow pv-glow-b"></span>
        <span class="pv-grid"></span>
        @for (p of particles; track p.id) {
          <span class="pv-particle" [style.left.%]="p.x" [style.top.%]="p.y" [style.--delay]="p.d + 's'"></span>
        }
      </div>

      <svg class="pv-svg-lines lms-svg" viewBox="0 0 500 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pv-grad-lms" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#1677A8" />
            <stop offset="100%" stop-color="#35BFE3" />
          </linearGradient>
        </defs>
        <path class="pv-path lms-journey" stroke="url(#pv-grad-lms)" d="M380 80 L380 340" />
        <path class="pv-path lms-journey-b" stroke="url(#pv-grad-lms)" d="M380 200 C340 200, 300 220, 260 240" />
      </svg>

      <div class="pv-kpi-float lms-kpi">🎓 94% Compliance Rate</div>

      <div class="lms-ring-wrap">
        <svg class="lms-ring" viewBox="0 0 80 80">
          <circle class="lms-ring-bg" cx="40" cy="40" r="32" />
          <circle class="lms-ring-fill" cx="40" cy="40" r="32" />
        </svg>
        <span class="lms-ring-val">87%</span>
        <small>Completion</small>
      </div>

      <article class="pv-dash lms-dash">
        <header class="pv-dash-head">
          <span class="pv-dash-icon lms-icon"></span>
          <div>
            <b>Learning Management</b>
            <small>Training &amp; Competency</small>
          </div>
        </header>

        <div class="pv-metrics lms-metrics">
          <div class="pv-metric"><em>248</em><span>Active Learners</span></div>
          <div class="pv-metric"><em>64</em><span>Courses</span></div>
          <div class="pv-metric"><em>87%</em><span>Completion</span></div>
          <div class="pv-metric"><em>94%</em><span>Compliance</span></div>
        </div>

        <p class="lms-section-label">Current Training</p>
        <ul class="lms-courses">
          <li>
            <div class="lms-course-head"><b>GMP Fundamentals</b><em>85%</em></div>
            <div class="lms-bar-track"><span class="lms-bar" style="--w: 85%"></span></div>
          </li>
          <li>
            <div class="lms-course-head"><b>Quality Procedures</b><em>68%</em></div>
            <div class="lms-bar-track"><span class="lms-bar" style="--w: 68%"></span></div>
          </li>
          <li class="done">
            <div class="lms-course-head"><b>Safety Training</b><em>100% ✓</em></div>
            <div class="lms-bar-track"><span class="lms-bar" style="--w: 100%"></span></div>
          </li>
        </ul>
      </article>

      <div class="lms-journey pv-workflow">
        @for (step of journey; track step; let i = $index) {
          <div class="pv-wf-node" [style.--wi]="i">
            <span class="pv-wf-dot"></span>
            <span class="pv-wf-label">{{ step }}</span>
          </div>
          @if (i < journey.length - 1) {
            <span class="pv-wf-line"></span>
          }
        }
      </div>

      <article class="pv-float-card lms-fc-module">
        <b>Module 3</b>
        <span>GMP Basics</span>
        <i class="pv-badge review">In Progress</i>
      </article>

      <div class="lms-avatars" aria-hidden="true">
        @for (a of avatars; track a) {
          <span [style.--ai]="a"></span>
        }
      </div>

      <article class="lms-certificate">
        <span class="lms-cert-badge">✓</span>
        <b>Certificate</b>
        <span>GMP Fundamentals</span>
        <em>Training Complete</em>
      </article>

      <aside class="pv-status-panel lms-assess">
        <header>Assessment</header>
        <div class="lms-score"><em>92</em><span>/ 100</span></div>
        <i class="pv-badge ok">Passed</i>
      </aside>
    </div>
  `,
  styleUrls: ['./product-visual-shared.css', './lms-product-visual.css'],
})
export class LmsProductVisualComponent {
  readonly journey = ['Course', 'Module', 'Learning', 'Assessment', 'Certificate'];
  readonly avatars = [0, 1, 2, 3];
  readonly particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 12 + ((i * 21) % 75),
    y: 10 + ((i * 27) % 80),
    d: (i * 0.5) % 2,
  }));
}
