import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { MsgKey } from '../i18n';
import { I18nService } from '../i18n.service';
import { FlowIconComponent, type FlowIconName } from './flow-icon.component';

export type CapabilityHighlight = 'shared' | 'qms' | 'dms' | 'lms' | null;

type CapFeature = {
  icon: FlowIconName;
  labelKey: MsgKey;
  noteKey?: MsgKey;
};

type CapRow = {
  id: Exclude<CapabilityHighlight, null>;
  icon: FlowIconName;
  titleKey: MsgKey;
  descKey: MsgKey;
  path?: string;
  features: CapFeature[];
};

const ROWS: CapRow[] = [
  {
    id: 'shared',
    icon: 'shield',
    titleKey: 'flow.shared.title',
    descKey: 'flow.shared.desc',
    features: [
      { icon: 'shield', labelKey: 'flow.shared.auth' },
      { icon: 'audit', labelKey: 'flow.shared.audit' },
      { icon: 'roles', labelKey: 'flow.shared.roles' },
    ],
  },
  {
    id: 'dms',
    icon: 'doc',
    titleKey: 'flow.dms.root',
    descKey: 'flow.dms.desc',
    path: '/products/document-management',
    features: [
      { icon: 'template', labelKey: 'flow.dms.templates' },
      { icon: 'upload', labelKey: 'flow.dms.upload' },
      { icon: 'revision', labelKey: 'flow.dms.revision' },
      { icon: 'print', labelKey: 'flow.dms.print' },
    ],
  },
  {
    id: 'lms',
    icon: 'cap',
    titleKey: 'flow.lms.root',
    descKey: 'flow.lms.desc',
    path: '/products/learning-management',
    features: [
      { icon: 'book', labelKey: 'flow.lms.docBased' },
      { icon: 'ilt', labelKey: 'flow.lms.ilt' },
      { icon: 'classroom', labelKey: 'flow.lms.classroom' },
      { icon: 'report', labelKey: 'flow.lms.report' },
      { icon: 'questions', labelKey: 'flow.lms.questions', noteKey: 'flow.lms.questionsNote' },
    ],
  },
  {
    id: 'qms',
    icon: 'medal',
    titleKey: 'flow.qms.root',
    descKey: 'flow.qms.desc',
    path: '/products/quality-management',
    features: [
      { icon: 'sliders', labelKey: 'flow.qms.change' },
      { icon: 'warn', labelKey: 'flow.qms.deviation' },
      { icon: 'check', labelKey: 'flow.qms.capa' },
      { icon: 'clock', labelKey: 'flow.qms.delay' },
    ],
  },
];

@Component({
  selector: 'app-platform-capabilities',
  imports: [RouterLink, FlowIconComponent],
  templateUrl: './platform-capabilities.html',
  styleUrl: './platform-capabilities.css',
  host: {
    '[class.compact]': 'compact()',
    '[class.theme-dark]': 'dark()',
    '[class.infographic]': 'infographic()',
    '[class.visible]': 'visible()',
    '[attr.data-highlight]': 'highlight() ?? null',
  },
})
export class PlatformCapabilitiesComponent {
  readonly i18n = inject(I18nService);
  readonly compact = input(false);
  readonly dark = input(false);
  readonly highlight = input<CapabilityHighlight>(null);
  readonly showHead = input(true);
  readonly infographic = input(false);
  readonly rows = ROWS;
  readonly visible = signal(false);

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  constructor() {
    afterNextRender(() => {
      if (!this.isBrowser) {
        this.visible.set(true);
        return;
      }
      const el = this.host.nativeElement;
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
        { threshold: 0.08, rootMargin: '40px 0px' },
      );
      io.observe(el);
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        reveal();
        io.disconnect();
      }
    });
  }
}
