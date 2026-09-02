import { Component } from '@angular/core';
import { ProductVisualMotionDirective } from './product-visual-motion.directive';

@Component({
  selector: 'app-dms-product-visual',
  imports: [ProductVisualMotionDirective],
  template: `
    <div alProductVisual class="dms-pv" aria-hidden="true">
      <div class="pv-bg">
        <span class="pv-glow pv-glow-a"></span>
        <span class="pv-glow pv-glow-b"></span>
        <span class="pv-grid"></span>
        @for (p of particles; track p.id) {
          <span class="pv-particle" [style.left.%]="p.x" [style.top.%]="p.y" [style.--delay]="p.d + 's'"></span>
        }
      </div>

      <svg class="pv-svg-lines" viewBox="0 0 500 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pv-grad-dms" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#35BFE3" />
            <stop offset="100%" stop-color="#1677A8" />
          </linearGradient>
        </defs>
        <path class="pv-path dms-path" stroke="url(#pv-grad-dms)" d="M58 72 L58 340" />
        <path class="pv-path dms-path-b" stroke="url(#pv-grad-dms)" d="M58 168 C100 168, 130 195, 168 220" />
        <path class="pv-path dms-path-c" stroke="url(#pv-grad-dms)" d="M58 248 C110 248, 140 265, 168 285" />
        <circle class="dms-traveler" r="2.5" cx="58" cy="72" />
      </svg>

      <div class="pv-kpi-float">📄 1,284 Documents Controlled</div>

      <div class="pv-workflow dms-wf">
        @for (step of workflow; track step; let i = $index) {
          <div class="pv-wf-node" [style.--wi]="i">
            <span class="pv-wf-dot"></span>
            <span class="pv-wf-label">{{ step }}</span>
          </div>
          @if (i < workflow.length - 1) {
            <span class="pv-wf-line"></span>
          }
        }
      </div>

      <article class="pv-dash dms-dash">
        <header class="pv-dash-head">
          <span class="pv-dash-icon dms-icon"></span>
          <div>
            <b>Document Control Center</b>
            <small>Lifecycle Management</small>
          </div>
        </header>

        <div class="pv-metrics">
          <div class="pv-metric"><em>1,284</em><span>Documents</span></div>
          <div class="pv-metric"><em>24</em><span>Pending Review</span></div>
          <div class="pv-metric"><em>86</em><span>Approved</span></div>
          <div class="pv-metric"><em>974</em><span>Controlled</span></div>
        </div>

        <p class="dms-section-label">Recent Documents</p>
        <ul class="dms-doc-list">
          <li class="dms-doc-item active">
            <div class="dms-doc-main">
              <b>SOP-001</b>
              <span>Manufacturing Procedure</span>
            </div>
            <div class="dms-doc-meta">
              <em>v3.2</em>
              <i class="pv-badge review">● Under Review</i>
            </div>
          </li>
          <li class="dms-doc-item">
            <div class="dms-doc-main">
              <b>SOP-002</b>
              <span>Cleaning Procedure</span>
            </div>
            <div class="dms-doc-meta">
              <em>v5.1</em>
              <i class="pv-badge ok">✓ Controlled</i>
            </div>
          </li>
          <li class="dms-doc-item">
            <div class="dms-doc-main">
              <b>POL-014</b>
              <span>Quality Policy</span>
            </div>
            <div class="dms-doc-meta">
              <em>v2.4</em>
              <i class="pv-badge ok">✓ Approved</i>
            </div>
          </li>
        </ul>
      </article>

      <article class="pv-float-card dms-fc-reviewer">
        <b>Reviewer</b>
        <span>Dr. Sarah Chen</span>
        <i class="pv-badge review">● Reviewing</i>
      </article>

      <article class="pv-float-card dms-fc-version">
        <b>Version History</b>
        <span>3.1 → 3.2</span>
        <i class="pv-badge ctrl">Updated</i>
      </article>

      <aside class="pv-status-panel dms-audit">
        <header>Audit Trail</header>
        <ol>
          <li><time>09:32</time> Created</li>
          <li><time>10:14</time> Review Started</li>
          <li><time>11:35</time> Approved</li>
          <li><time>11:40</time> Controlled</li>
        </ol>
      </aside>

      <article class="dms-doc-stack" aria-hidden="true">
        <span></span><span></span><span class="top"></span>
      </article>
    </div>
  `,
  styleUrls: ['./product-visual-shared.css', './dms-product-visual.css'],
})
export class DmsProductVisualComponent {
  readonly workflow = ['Draft', 'Review', 'Approval', 'Controlled'];
  readonly particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 10 + ((i * 19) % 80),
    y: 8 + ((i * 23) % 85),
    d: (i * 0.4) % 2.5,
  }));
}
