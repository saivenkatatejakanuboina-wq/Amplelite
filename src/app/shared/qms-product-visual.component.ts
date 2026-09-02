import { Component } from '@angular/core';
import { ProductVisualMotionDirective } from './product-visual-motion.directive';

@Component({
  selector: 'app-qms-product-visual',
  imports: [ProductVisualMotionDirective],
  template: `
    <div alProductVisual class="qms-pv" aria-hidden="true">
      <div class="pv-bg">
        <span class="pv-glow pv-glow-a"></span>
        <span class="pv-glow pv-glow-b"></span>
        <span class="pv-grid"></span>
        @for (p of particles; track p.id) {
          <span class="pv-particle" [style.left.%]="p.x" [style.top.%]="p.y" [style.--delay]="p.d + 's'"></span>
        }
      </div>

      <svg class="pv-svg-lines qms-tree" viewBox="0 0 500 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="pv-grad-qms" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1677A8" />
            <stop offset="100%" stop-color="#35BFE3" />
          </linearGradient>
        </defs>
        <!-- Root cause tree -->
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 60 L72 120" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 120 L72 180" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 180 L40 220" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 180 L72 220" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 180 L104 220" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 220 L72 280" />
        <path class="pv-path qms-tree-path" stroke="url(#pv-grad-qms)" d="M72 280 L72 340" />
        <circle class="qms-traveler" r="2.5" cx="72" cy="60" />
      </svg>

      <div class="pv-kpi-float qms-kpi">⚡ Quality Health: 92%</div>

      <div class="qms-health-ring">
        <svg viewBox="0 0 64 64">
          <circle class="qms-h-bg" cx="32" cy="32" r="26" />
          <circle class="qms-h-fill" cx="32" cy="32" r="26" />
        </svg>
        <span>92%</span>
      </div>

      <article class="pv-dash qms-dash">
        <header class="pv-dash-head">
          <span class="pv-dash-icon qms-icon"></span>
          <div>
            <b>Quality Management</b>
            <small>Intelligence Center</small>
          </div>
        </header>

        <div class="pv-metrics qms-metrics">
          <div class="pv-metric warn-m"><em>12</em><span>Open Deviations</span></div>
          <div class="pv-metric"><em>8</em><span>Open CAPA</span></div>
          <div class="pv-metric"><em>5</em><span>Change Controls</span></div>
          <div class="pv-metric"><em>3</em><span>Audit Findings</span></div>
        </div>

        <p class="qms-section-label">Quality Trend</p>
        <svg class="qms-chart" viewBox="0 0 200 48" preserveAspectRatio="none">
          <path class="qms-chart-line" d="M0 40 L30 32 L60 28 L90 22 L120 18 L150 14 L180 10 L200 8" />
          <path class="qms-chart-area" d="M0 40 L30 32 L60 28 L90 22 L120 18 L150 14 L180 10 L200 8 L200 48 L0 48 Z" />
        </svg>

        <p class="qms-section-label">CAPA Status</p>
        <div class="qms-capa-bars">
          <div class="qms-capa-row"><span>Open</span><div class="qms-capa-track"><i style="--w: 35%"></i></div></div>
          <div class="qms-capa-row"><span>Progress</span><div class="qms-capa-track"><i style="--w: 55%"></i></div></div>
          <div class="qms-capa-row"><span>Closed</span><div class="qms-capa-track"><i class="closed" style="--w: 78%"></i></div></div>
        </div>
      </article>

      <div class="qms-rca-tree">
        <div class="qms-rca-node root">Problem</div>
        <div class="qms-rca-node">Investigation</div>
        <div class="qms-rca-branches">
          <span>People</span><span>Process</span><span>Equip.</span>
        </div>
        <div class="qms-rca-node capa">CAPA</div>
        <div class="qms-rca-node closed">Closed ✓</div>
      </div>

      <div class="qms-wf pv-workflow">
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

      <article class="pv-float-card qms-fc-dev">
        <b>DEV-042</b>
        <span>Deviation Report</span>
        <i class="pv-badge warn">● Open</i>
      </article>

      <article class="pv-float-card qms-fc-capa">
        <b>CAPA-018</b>
        <span>Effectiveness Check</span>
        <i class="pv-badge review">In Progress</i>
      </article>

      <aside class="pv-status-panel qms-audit-ind">
        <header>Risk Level</header>
        <div class="qms-risk"><span class="low"></span><span class="med on"></span><span class="high"></span></div>
        <em class="pv-badge warn">Medium</em>
      </aside>
    </div>
  `,
  styleUrls: ['./product-visual-shared.css', './qms-product-visual.css'],
})
export class QmsProductVisualComponent {
  readonly workflow = ['Deviation', 'Investigation', 'Root Cause', 'CAPA', 'Closed'];
  readonly particles = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: 8 + ((i * 17) % 82),
    y: 6 + ((i * 21) % 88),
    d: (i * 0.35) % 2.2,
  }));
}
