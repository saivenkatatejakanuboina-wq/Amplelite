import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import type { MsgKey } from './i18n';
import { I18nService } from './i18n.service';
import { ProductBannerComponent } from './shared/product-banner.component';
import { PlatformConnectComponent } from './shared/platform-connect.component';
import { ProductCapabilityFlowComponent } from './shared/product-capability-flow.component';
import { ProductFaqComponent } from './shared/product-faq.component';
import { ProductFlowStageComponent } from './shared/product-flow-stage.component';
import { ScrollRevealDirective } from './shared/scroll-reveal.directive';

export type CapabilityKey = 'qms' | 'dms' | 'lms';

type CapabilityMeta = {
  key: CapabilityKey;
  mark: string;
  path: string;
  nameKey: MsgKey;
  titleKey: MsgKey;
  descKey: MsgKey;
  overviewKey: MsgKey;
  flow: MsgKey[];
  featureCount: number;
  benefitKeys: MsgKey[];
};

const CAPABILITIES: Record<CapabilityKey, CapabilityMeta> = {
  qms: {
    key: 'qms',
    mark: 'QMS',
    path: '/products/quality-management',
    nameKey: 'cap.qms.name',
    titleKey: 'cap.qms.title',
    descKey: 'cap.qms.desc',
    overviewKey: 'cap.qms.overview',
    flow: ['cap.qms.flow1', 'cap.qms.flow2', 'cap.qms.flow3', 'cap.qms.flow4', 'cap.qms.flow5'],
    featureCount: 6,
    benefitKeys: ['cap.qms.b1', 'cap.qms.b2', 'cap.qms.b3'],
  },
  dms: {
    key: 'dms',
    mark: 'DMS',
    path: '/products/document-management',
    nameKey: 'cap.dms.name',
    titleKey: 'cap.dms.title',
    descKey: 'cap.dms.desc',
    overviewKey: 'cap.dms.overview',
    flow: ['cap.dms.flow1', 'cap.dms.flow2', 'cap.dms.flow3', 'cap.dms.flow4', 'cap.dms.flow5'],
    featureCount: 6,
    benefitKeys: ['cap.dms.b1', 'cap.dms.b2', 'cap.dms.b3'],
  },
  lms: {
    key: 'lms',
    mark: 'LMS',
    path: '/products/learning-management',
    nameKey: 'cap.lms.name',
    titleKey: 'cap.lms.title',
    descKey: 'cap.lms.desc',
    overviewKey: 'cap.lms.overview',
    flow: ['cap.lms.flow1', 'cap.lms.flow2', 'cap.lms.flow3', 'cap.lms.flow4', 'cap.lms.flow5'],
    featureCount: 7,
    benefitKeys: ['cap.lms.b1', 'cap.lms.b2', 'cap.lms.b3'],
  },
};

@Component({
  selector: 'app-capability-page',
  imports: [
    RouterLink,
    ProductBannerComponent,
    PlatformConnectComponent,
    ProductCapabilityFlowComponent,
    ProductFaqComponent,
    ProductFlowStageComponent,
    ScrollRevealDirective,
  ],
  templateUrl: './capability-page.html',
  styleUrl: './capability-page.css',
})
export class CapabilityPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);

  readonly key = toSignal(
    this.route.data.pipe(map((data) => (data['capability'] as CapabilityKey) || 'qms')),
    { initialValue: (this.route.snapshot.data['capability'] as CapabilityKey) || 'qms' },
  );

  readonly meta = computed(() => CAPABILITIES[this.key()]);

  readonly name = computed(() => this.i18n.t(this.meta().nameKey));
  readonly title = computed(() => this.i18n.t(this.meta().titleKey));
  readonly desc = computed(() => this.i18n.t(this.meta().descKey));
  readonly overview = computed(() => this.i18n.t(this.meta().overviewKey));
  readonly flow = computed(() => this.meta().flow.map((k) => this.i18n.t(k)));
  readonly exploreTitle = computed(() => {
    const key = this.key();
    if (key === 'qms') return this.i18n.t('cap.qms.explore.h2');
    if (key === 'dms') return this.i18n.t('cap.dms.explore.h2');
    return this.i18n.t('cap.lms.explore.h2');
  });
  readonly capTitle = computed(() => {
    const key = this.key();
    if (key === 'qms') return this.i18n.t('cap.qms.cap.h2');
    if (key === 'dms') return this.i18n.t('cap.dms.cap.h2');
    return this.i18n.t('cap.lms.cap.h2');
  });
  readonly howTitle = computed(() => {
    const key = this.key();
    if (key === 'qms') return this.i18n.t('cap.qms.how.h2');
    if (key === 'dms') return this.i18n.t('cap.dms.how.h2');
    return this.i18n.t('cap.lms.how.h2');
  });
  readonly features = computed(() => {
    const prefix = `mod.${this.key()}.f` as const;
    return Array.from({ length: this.meta().featureCount }, (_, i) => {
      const raw = this.i18n.t(`${prefix}${i + 1}` as MsgKey);
      const parts = raw.split(/\s[—–-]\s/);
      return { title: parts[0], body: parts.slice(1).join(' — ') };
    });
  });
  readonly benefits = computed(() => this.meta().benefitKeys.map((k) => this.i18n.t(k)));
  readonly others = computed(() =>
    (Object.values(CAPABILITIES) as CapabilityMeta[])
      .filter((item) => item.key !== this.key())
      .map((item) => ({
        path: item.path,
        mark: item.mark,
        name: this.i18n.t(item.nameKey),
        blurb: this.i18n.t(item.descKey),
        art: `amplelite-assets/product-${item.key}.svg`,
      })),
  );
}
