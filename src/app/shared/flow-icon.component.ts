import { Component, input } from '@angular/core';

export type FlowIconName =
  | 'medal'
  | 'activity'
  | 'sliders'
  | 'warn'
  | 'check'
  | 'review'
  | 'eye'
  | 'record'
  | 'doc'
  | 'folder'
  | 'template'
  | 'upload'
  | 'revision'
  | 'print'
  | 'control'
  | 'cap'
  | 'program'
  | 'book'
  | 'ilt'
  | 'video'
  | 'assign'
  | 'report'
  | 'questions'
  | 'readiness'
  | 'shield'
  | 'audit'
  | 'roles'
  | 'clock'
  | 'classroom';

@Component({
  selector: 'app-flow-icon',
  template: `
    <span class="icon-wrap" [class.sm]="size() === 'sm'" [class.light]="light()" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
        @switch (name()) {
          @case ('medal') {
            <circle cx="12" cy="8.5" r="3.5" />
            <path d="M8.2 12.5 7 20l5-2.5L17 20l-1.2-7.5" />
          }
          @case ('activity') {
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M8 9h8M8 12h8M8 15h5" />
          }
          @case ('sliders') {
            <path d="M4 7h16M4 12h16M4 17h16" />
            <circle cx="9" cy="7" r="1.75" fill="currentColor" stroke="none" />
            <circle cx="15" cy="12" r="1.75" fill="currentColor" stroke="none" />
            <circle cx="11" cy="17" r="1.75" fill="currentColor" stroke="none" />
          }
          @case ('warn') {
            <path d="M12 4.5 20.5 19H3.5L12 4.5z" />
            <path d="M12 10v4M12 16.5h.01" />
          }
          @case ('check') {
            <circle cx="12" cy="12" r="8" />
            <path d="m8.5 12 2.2 2.2L15.8 9" />
          }
          @case ('review') {
            <path d="M8 4h8a2 2 0 0 1 2 2v12l-3-2-3 2-3-2-3 2V6a2 2 0 0 1 2-2z" />
            <path d="M9 9h6M9 12h4" />
          }
          @case ('eye') {
            <path d="M2.5 12C4.5 7.5 8 5 12 5s7.5 2.5 9.5 7c-2 4.5-5.5 7-9.5 7s-7.5-2.5-9.5-7z" />
            <circle cx="12" cy="12" r="2.5" />
          }
          @case ('record') {
            <ellipse cx="12" cy="6" rx="7" ry="2.5" />
            <path d="M5 6v8c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
            <path d="M5 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
          }
          @case ('doc') {
            <path d="M8 4h6l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="M14 4v4h4M9 12h6M9 16h4" />
          }
          @case ('folder') {
            <path d="M4 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7z" />
          }
          @case ('template') {
            <rect x="5" y="4" width="14" height="16" rx="2" />
            <path d="M9 4v4h6V4M8 12h8M8 16h5" />
          }
          @case ('upload') {
            <path d="M12 16V8M8.5 11.5 12 8l3.5 3.5" />
            <path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" />
          }
          @case ('revision') {
            <path d="M12 6a6 6 0 1 1-4.2 10.2" />
            <path d="M8 6H12V2" />
          }
          @case ('print') {
            <path d="M7 8V4h10v4" />
            <rect x="6" y="12" width="12" height="8" rx="1" />
            <path d="M6 9h12a2 2 0 0 1 2 2v3H4v-3a2 2 0 0 1 2-2z" />
          }
          @case ('control') {
            <rect x="6" y="11" width="12" height="9" rx="2" />
            <path d="M9 11V8a3 3 0 0 1 6 0v3" />
          }
          @case ('cap') {
            <path d="M4 9 12 5l8 4-8 4-8-4z" />
            <path d="M8 11v4.5a4 4 0 0 0 8 0V11" />
          }
          @case ('program') {
            <path d="M5 8h14M5 12h14M5 16h14" />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="8" cy="12" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
          }
          @case ('book') {
            <path d="M5 5h7a2 2 0 0 1 2 2v12H7a2 2 0 0 1-2-2V5z" />
            <path d="M12 7h5a2 2 0 0 1 2 2v10" />
          }
          @case ('ilt') {
            <rect x="3" y="5" width="18" height="12" rx="2" />
            <path d="M8 16v2M16 16v2M3 10h18" />
          }
          @case ('video') {
            <rect x="4" y="6" width="13" height="12" rx="2" />
            <path d="m16 10 5-3v10l-5-3v-4z" />
          }
          @case ('assign') {
            <circle cx="9" cy="8" r="3" />
            <path d="M4 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
            <path d="M17 8h4M19 6v4" />
          }
          @case ('report') {
            <path d="M6 4h10l4 4v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
            <path d="M14 4v4h4M8 14v4M12 12v6M16 10v8" />
          }
          @case ('questions') {
            <circle cx="12" cy="12" r="8" />
            <path d="M9.5 9.2a2.6 2.6 0 1 1 4.3 2c-.9.8-1.8 1.3-1.8 2.8M12 16.8h.01" />
          }
          @case ('readiness') {
            <path d="M12 3 4 7v6c0 4.2 3.4 6.8 8 8 4.6-1.2 8-3.8 8-8V7l-8-4z" />
            <path d="m9 12 2 2 4-4" />
          }
          @case ('shield') {
            <path d="M12 3 4 7v6c0 4.2 3.4 6.8 8 8 4.6-1.2 8-3.8 8-8V7l-8-4z" />
          }
          @case ('audit') {
            <circle cx="10" cy="10" r="5.5" />
            <path d="M14.5 14.5 20 20M8 10h4M10 8v4" />
          }
          @case ('roles') {
            <circle cx="8" cy="9" r="2.5" />
            <circle cx="16" cy="9" r="2.5" />
            <path d="M3.5 19c.8-2.4 2.7-4 4.5-4s3.7 1.6 4.5 4M11.5 19c.8-2.4 2.7-4 4.5-4s3.7 1.6 4.5 4" />
          }
          @case ('clock') {
            <circle cx="12" cy="12" r="8" />
            <path d="M12 8v4l3 2" />
          }
          @case ('classroom') {
            <rect x="4" y="8" width="16" height="10" rx="1.5" />
            <path d="M7 8V6h10v2M8 18v2M16 18v2" />
            <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none" />
            <circle cx="12" cy="13" r="1" fill="currentColor" stroke="none" />
            <circle cx="16" cy="13" r="1" fill="currentColor" stroke="none" />
          }
        }
      </svg>
    </span>
  `,
  styles: `
    :host { display: contents; }
    .icon-wrap {
      display: grid;
      place-items: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #eef4fb;
      border: 1px solid #d5deea;
      color: #123a6b;
      flex-shrink: 0;
      transition: transform .25s cubic-bezier(.22, .61, .36, 1),
        box-shadow .25s ease,
        background .25s ease,
        border-color .25s ease;
      animation: al-icon-pop .45s cubic-bezier(.22, .61, .36, 1) both;
    }
    .icon-wrap:hover {
      transform: scale(1.08);
      box-shadow: 0 6px 16px rgba(18, 58, 107, .14);
    }
    .icon-wrap svg {
      width: 22px;
      height: 22px;
      display: block;
    }
    .icon-wrap.sm {
      width: 32px;
      height: 32px;
    }
    .icon-wrap.sm svg {
      width: 16px;
      height: 16px;
    }
    .icon-wrap.light {
      background: rgba(255, 255, 255, .14);
      border-color: rgba(255, 255, 255, .28);
      color: #fff;
    }
  `,
})
export class FlowIconComponent {
  readonly name = input.required<FlowIconName>();
  readonly size = input<'md' | 'sm'>('md');
  readonly light = input(false);
}
