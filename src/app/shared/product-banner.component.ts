import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { MsgKey } from '../i18n';
import { I18nService } from '../i18n.service';
import { ProductWorkflowVisualComponent } from './product-workflow-visual.component';

export type BannerKind = 'qms' | 'dms' | 'lms';

@Component({
  selector: 'app-product-banner',
  imports: [RouterLink, ProductWorkflowVisualComponent],
  template: `
    <section class="banner" [attr.data-kind]="kind()">
      <div class="banner-bg" aria-hidden="true">
        <div class="banner-mesh"></div>
        <span class="orb o1"></span>
        <span class="orb o2"></span>
        <span class="orb o3"></span>
        <span class="banner-shimmer"></span>
      </div>
      <div class="wrap banner-grid">
        <div class="copy">
          <nav class="crumbs banner-enter" style="--d: 0ms" aria-label="Breadcrumb">
            <a routerLink="/">{{ i18n.t('nav.home') }}</a>
            <span>/</span>
            <a routerLink="/products">{{ i18n.t('nav.products') }}</a>
            <span>/</span>
            <span>{{ i18n.t(nameKey()) }}</span>
          </nav>
          <p class="mark banner-enter" style="--d: 80ms">{{ mark() }}</p>
          <h1 class="banner-enter" style="--d: 160ms">{{ i18n.t(nameKey()) }}</h1>
          <p class="lede banner-enter" style="--d: 240ms">{{ i18n.t(ledeKey()) }}</p>
          <div class="actions banner-enter" style="--d: 320ms">
            <a class="btn solid" routerLink="/contact">{{ i18n.t('cap.cta.register') }}</a>
            <a class="btn outline" href="#showcase">{{ i18n.t('dash.seeInAction') }} <em aria-hidden="true">&rarr;</em></a>
          </div>
        </div>

        <div class="visual banner-enter" style="--d: 400ms">
          <app-product-workflow-visual [kind]="kind()" />
        </div>
      </div>
    </section>
  `,
  styleUrl: './product-banner.css',
})
export class ProductBannerComponent {
  readonly i18n = inject(I18nService);
  readonly kind = input.required<BannerKind>();

  readonly mark = computed(() => this.kind().toUpperCase());
  readonly nameKey = computed(() => `cap.${this.kind()}.name` as MsgKey);
  readonly ledeKey = computed(() => `cap.banner.${this.kind()}` as MsgKey);
}
