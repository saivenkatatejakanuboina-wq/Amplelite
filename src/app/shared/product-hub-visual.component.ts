import { Component, input } from '@angular/core';

type HubKind = 'qms' | 'dms' | 'lms';

@Component({
  selector: 'app-product-hub-visual',
  template: `
    <div class="hub" [attr.data-kind]="kind()" aria-hidden="true">
      <svg class="hub-svg" viewBox="0 0 640 460" fill="none">
        <defs>
          <radialGradient [attr.id]="'hubAura-' + kind()" cx="320" cy="230" r="200" gradientUnits="userSpaceOnUse">
            <stop stop-color="#35BFE3" stop-opacity=".3"/>
            <stop offset="1" stop-color="#35BFE3" stop-opacity="0"/>
          </radialGradient>
          <linearGradient [attr.id]="'hubLine-' + kind()" x1="320" y1="230" x2="140" y2="90" gradientUnits="userSpaceOnUse">
            <stop stop-color="#7DD3FC"/>
            <stop offset="1" stop-color="#1677A8"/>
          </linearGradient>
          <filter [attr.id]="'hubGlow-' + kind()" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.4" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        <rect width="640" height="460" rx="22" fill="#071A33"/>
        <circle cx="320" cy="230" r="188" [attr.fill]="'url(#hubAura-' + kind() + ')'"/>
        <circle class="bg-ring r1" cx="150" cy="96" r="42" />
        <circle class="bg-ring r2" cx="520" cy="86" r="28" />
        <circle class="bg-ring r3" cx="88" cy="340" r="24" />
        <circle class="bg-ring r4" cx="560" cy="360" r="36" />
        <g class="dots" fill="#7DD3FC">
          <circle cx="180" cy="70" r="2"/>
          <circle cx="500" cy="64" r="1.6"/>
          <circle cx="590" cy="240" r="2"/>
          <circle cx="70" cy="210" r="1.6"/>
          <circle cx="420" cy="410" r="1.8"/>
        </g>

        <g class="spokes" [attr.stroke]="'url(#hubLine-' + kind() + ')'" stroke-width="1.7" stroke-linecap="round">
          <path class="spoke s-ai" d="M320 230 L320 52"/>
          <path class="spoke s1" d="M320 230 L181 119"/>
          <path class="spoke s2" d="M320 230 L459 119"/>
          <path class="spoke s3" d="M320 230 L494 270"/>
          <path class="spoke s4" d="M320 230 L397 390"/>
          <path class="spoke s5" d="M320 230 L243 390"/>
          <path class="spoke s6" d="M320 230 L146 270"/>
        </g>
        <g class="packets" fill="#7DD3FC" [attr.filter]="'url(#hubGlow-' + kind() + ')'">
          <circle class="pkt p-ai" r="3.2"/>
          <circle class="pkt p1" r="3.2"/>
          <circle class="pkt p2" r="3.2"/>
          <circle class="pkt p3" r="3.2"/>
          <circle class="pkt p4" r="3.2"/>
          <circle class="pkt p5" r="3.2"/>
          <circle class="pkt p6" r="3.2"/>
        </g>

        <g class="core">
          <circle class="core-pulse" cx="320" cy="230" r="70"/>
          <circle class="core-ring" cx="320" cy="230" r="62" [attr.filter]="'url(#hubGlow-' + kind() + ')'"/>
          <circle class="core-fill" cx="320" cy="230" r="54"/>
          <text x="320" y="238" text-anchor="middle">{{ kind().toUpperCase() }}</text>
        </g>

        <g transform="translate(320 52)">
          <g class="node n-ai">
            <circle class="node-ring" r="32"/>
            <circle class="node-fill" r="26"/>
            <g class="ai-mark">
              <ellipse cx="0" cy="0" rx="17" ry="6.5" transform="rotate(-32)"/>
              <ellipse cx="0" cy="0" rx="17" ry="6.5" transform="rotate(38)"/>
              <rect x="-8.5" y="-8.5" width="17" height="17" rx="3.5"/>
              <text x="0" y="3.2">Ai</text>
            </g>
          </g>
        </g>
        <g transform="translate(181 119)">
          <g class="node n1">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(0)"/>
          </g>
        </g>
        <g transform="translate(459 119)">
          <g class="node n2">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(1)"/>
          </g>
        </g>
        <g transform="translate(494 270)">
          <g class="node n3">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(2)"/>
          </g>
        </g>
        <g transform="translate(397 390)">
          <g class="node n4">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(3)"/>
          </g>
        </g>
        <g transform="translate(243 390)">
          <g class="node n5">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(4)"/>
          </g>
        </g>
        <g transform="translate(146 270)">
          <g class="node n6">
            <circle class="node-ring" r="32"/><circle class="node-fill" r="26"/>
            <path class="icon" [attr.d]="icon(5)"/>
          </g>
        </g>
      </svg>
    </div>
  `,
  styles: [`
    :host { display: block; width: 100%; }
    .hub {
      position: relative;
      width: 100%;
      max-width: 560px;
      margin-left: auto;
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
    }
    .hub-svg { display: block; width: 100%; height: auto; }
    .bg-ring { fill: none; stroke: #35BFE3; stroke-opacity: .12; stroke-width: 1.2; }
    .r1 { animation: ring-spin 22s linear infinite; transform-origin: 150px 96px; }
    .r2 { animation: ring-spin 18s linear infinite reverse; transform-origin: 520px 86px; }
    .r3 { animation: ring-spin 26s linear infinite; transform-origin: 88px 340px; }
    .r4 { animation: ring-spin 20s linear infinite reverse; transform-origin: 560px 360px; }
    .dots circle { animation: dot-twinkle 3.2s ease-in-out infinite; }
    .dots circle:nth-child(2) { animation-delay: -.6s; }
    .dots circle:nth-child(3) { animation-delay: -1.2s; }
    .dots circle:nth-child(4) { animation-delay: -1.8s; }
    .dots circle:nth-child(5) { animation-delay: -2.4s; }
    .spoke { stroke-dasharray: 6 10; animation: spoke-flow 1.6s linear infinite; }
    .s2 { animation-delay: -.25s; }
    .s3 { animation-delay: -.5s; }
    .s4 { animation-delay: -.75s; }
    .s5 { animation-delay: -1s; }
    .s6 { animation-delay: -1.25s; }
    .s-ai { animation-delay: 0s; }
    .pkt { offset-rotate: 0deg; }
    .p-ai { offset-path: path('M320 230 L320 52'); animation: travel 2.8s ease-in-out infinite; }
    .p1 { offset-path: path('M320 230 L181 119'); animation: travel 2.8s ease-in-out infinite .2s; }
    .p2 { offset-path: path('M320 230 L459 119'); animation: travel 3.1s ease-in-out infinite .3s; }
    .p3 { offset-path: path('M320 230 L494 270'); animation: travel 2.6s ease-in-out infinite .6s; }
    .p4 { offset-path: path('M320 230 L397 390'); animation: travel 3s ease-in-out infinite .15s; }
    .p5 { offset-path: path('M320 230 L243 390'); animation: travel 2.7s ease-in-out infinite .45s; }
    .p6 { offset-path: path('M320 230 L146 270'); animation: travel 2.9s ease-in-out infinite .75s; }
    .core-pulse {
      fill: none; stroke: #35BFE3; stroke-width: 1.5; opacity: .35;
      animation: core-breathe 2.8s ease-in-out infinite;
      transform-origin: 320px 230px;
    }
    .core-ring { fill: none; stroke: #7DD3FC; stroke-width: 2.4; }
    .core-fill { fill: #08243F; }
    .core text {
      fill: #fff; font-family: Inter, Arial, sans-serif;
      font-size: 26px; font-weight: 800; letter-spacing: 1.5px;
    }
    .node { animation: node-in .7s cubic-bezier(.22,1,.36,1) both; }
    .n1 { animation-delay: .1s; }
    .n2 { animation-delay: .18s; }
    .n3 { animation-delay: .26s; }
    .n4 { animation-delay: .34s; }
    .n5 { animation-delay: .42s; }
    .n6 { animation-delay: .5s; }
    .n-ai { animation-delay: .04s; }
    .node-ring { fill: none; stroke: #7DD3FC; stroke-width: 2; animation: node-glow 2.8s ease-in-out infinite; }
    .n2 .node-ring { animation-delay: -.4s; }
    .n3 .node-ring { animation-delay: -.8s; }
    .n4 .node-ring { animation-delay: -1.2s; }
    .n5 .node-ring { animation-delay: -1.6s; }
    .n6 .node-ring { animation-delay: -2s; }
    .node-fill { fill: #08243F; }
    .icon { fill: #E8F7FC; }
    .ai-mark ellipse {
      fill: none;
      stroke: #E8F7FC;
      stroke-width: 1.6;
    }
    .ai-mark rect {
      fill: #08243F;
      stroke: #E8F7FC;
      stroke-width: 1.6;
    }
    .ai-mark text {
      fill: #E8F7FC;
      font-family: Inter, Arial, sans-serif;
      font-size: 8.5px;
      font-weight: 800;
      text-anchor: middle;
    }
    .hub[data-kind='qms'] .core-ring, .hub[data-kind='qms'] .node-ring { stroke: #FDBA74; }
    .hub[data-kind='qms'] .bg-ring { stroke: #FDBA74; }
    .hub[data-kind='qms'] .pkt, .hub[data-kind='qms'] .dots circle { fill: #FDBA74; }
    .hub[data-kind='qms'] .core-pulse { stroke: #FDBA74; }
    .hub[data-kind='lms'] .core-ring, .hub[data-kind='lms'] .node-ring { stroke: #A5B4FC; }
    .hub[data-kind='lms'] .bg-ring { stroke: #A5B4FC; }
    .hub[data-kind='lms'] .pkt, .hub[data-kind='lms'] .dots circle { fill: #A5B4FC; }
    .hub[data-kind='lms'] .core-pulse { stroke: #A5B4FC; }
    .p-ai,
    .hub[data-kind='qms'] .p-ai,
    .hub[data-kind='lms'] .p-ai { fill: #7DD3FC; }
    @keyframes spoke-flow { to { stroke-dashoffset: -32; } }
    @keyframes travel {
      0% { offset-distance: 8%; opacity: 0; }
      12%, 88% { opacity: 1; }
      100% { offset-distance: 92%; opacity: 0; }
    }
    @keyframes core-breathe {
      0%, 100% { transform: scale(1); opacity: .28; }
      50% { transform: scale(1.12); opacity: .55; }
    }
    @keyframes node-glow { 0%, 100% { stroke-opacity: .7; } 50% { stroke-opacity: 1; } }
    @keyframes node-in { from { opacity: 0; transform: scale(.72); } to { opacity: 1; transform: scale(1); } }
    @keyframes ring-spin { to { transform: rotate(360deg); } }
    @keyframes dot-twinkle { 0%, 100% { opacity: .25; } 50% { opacity: .9; } }
    @media (prefers-reduced-motion: reduce) {
      .spoke, .pkt, .core-pulse, .node, .node-ring, .bg-ring, .dots circle { animation: none !important; }
      .node { opacity: 1; }
      .spoke { stroke-dasharray: none; }
    }
  `],
})
export class ProductHubVisualComponent {
  readonly kind = input.required<HubKind>();

  private readonly icons: Record<HubKind, string[]> = {
    dms: [
      'M-2-11h4l1 3.4 3.2-1.2 1.6 2.6-2.6 2.2 2.6 2.2-1.6 2.6-3.2-1.2L2 11h-4l-1-3.4-3.2 1.2-1.6-2.6 2.6-2.2-2.6-2.2 1.6-2.6 3.2 1.2L-2-11zm2 7.2a3.8 3.8 0 100 7.6 3.8 3.8 0 000-7.6z',
      'M0-8a5.2 5.2 0 110 10.4A5.2 5.2 0 010-8zm0 12.2c-6.2 0-11 3.2-11 7.2v1.8h22v-1.8c0-4-4.8-7.2-11-7.2z',
      'M-7-11h8l6 6v16h-14V-11zm8 1.4V-3h5.2L1-9.6zM-4-2h8v1.6h-8V-2zm0 4h10v1.6h-10V2zm0 4h10v1.6h-10V6z',
      'M-6 1h12v10H-6V1zm1.8 0V-2.2a4.2 4.2 0 118.4 0V1h-1.8V-2.2a2.4 2.4 0 10-4.8 0V1H-4.2z',
      'M0-12l10 4.2v6.6c0 6.2-4 10.4-10 12.6-6-2.2-10-6.4-10-12.6V-7.8L0-12zm-1 8.2 4.8 4.8 1.4-1.4-6.2-6.2-3.4 3.4 1.4 1.4 2-2z',
      'M8-7v14L-4 4V-4L8-7zM-8-1h3.2v8H-9.2A3 3 0 01-12 4.2 3 3 0 01-8-1z',
    ],
    qms: [
      'M0-12l10 4.2v6.6c0 6.2-4 10.4-10 12.6-6-2.2-10-6.4-10-12.6V-7.8L0-12z',
      'M0-11 11 10H-11L0-11zm0 6v5M0 8.6h.01',
      'M0-11a11 11 0 100 22 11 11 0 000-22zm-4.2 11 2.8 2.8 6.4-6.4',
      'M-11-6h22M-11 0h22M-11 6h22M-5-6a1.8 1.8 0 110 0zm6 6a1.8 1.8 0 110 0zm-3 6a1.8 1.8 0 110 0z',
      'M-7-10h8a3 3 0 013 3v17l-4-2.2-3.5 2.2-3.5-2.2-4 2.2V-7a3 3 0 013-3zM-4-3h8M-4 1h6',
      'M-9 8V-4h5l3-3h10v15H-9zm4-8h10v1.6H-5V0zm0 4h7v1.6H-5V4z',
    ],
    lms: [
      'M0-8 12-3v2L0-6-12-1v-2L0-8zm-10 6.2 10-4.2 10 4.2v6.2c-3.2 2-6.6 3-10 3s-6.8-1-10-3V-1.8z',
      'M-8-10h7a3 3 0 013 3v17H-5a3 3 0 01-3-3V-10zm7 0h7a3 3 0 013 3v14a3 3 0 01-3 3h-7V-10z',
      'M-2-7a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm8 .8a3.6 3.6 0 11.2 7.2M-2 4.2c-5.4 0-9.6 2.6-9.6 5.8V12h19.2v-2c0-3.2-4.2-5.8-9.6-5.8zm8.4.6c3.6.4 6.4 2.2 6.4 4.8V12h-5.2',
      'M-10-7h14a2 2 0 012 2v10a2 2 0 01-2 2h-14a2 2 0 01-2-2V-5a2 2 0 012-2zm6 3.2 7 4.8-7 4.8V-3.8z',
      'M-8-6a4 4 0 110 8 4 4 0 010-8zm0 10c-5 0-9 2.4-9 5.4V11h12.4M3 0h9M9-3v6',
      'M0-10a10 10 0 100 20 10 10 0 000-20zm-1 5h2v1.6H-1V-5zm0 3.4h2V6H-1V-1.6z',
    ],
  };

  icon(index: number): string {
    return this.icons[this.kind()][index];
  }
}
