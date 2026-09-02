import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { MsgKey } from './i18n';
import { I18nService } from './i18n.service';

type ModuleKey = 'qms' | 'dms' | 'lms';

@Component({
  selector: 'app-module-page',
  imports: [RouterLink],
  templateUrl: './module-page.html',
  styleUrl: './module-page.css',
})
export class ModulePageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);
  readonly key = (this.route.snapshot.data['module'] as ModuleKey) || 'qms';
  readonly name = this.key.toUpperCase();

  readonly fullName = computed(() => this.i18n.t(`mod.${this.key}.full` as MsgKey));
  readonly heading = computed(() => this.i18n.t(`mod.${this.key}.title` as MsgKey));
  readonly desc = computed(() => this.i18n.t(`mod.${this.key}.desc` as MsgKey));
  readonly featureItems = computed(() => {
    const count = this.key === 'lms' ? 7 : 6;
    return Array.from({ length: count }, (_, i) => {
      const raw = this.i18n.t(`mod.${this.key}.f${i + 1}` as MsgKey);
      const parts = raw.split(/\s[—–-]\s/);
      return { title: parts[0], body: parts.slice(1).join(' — ') };
    });
  });
  readonly preview = computed(() =>
    this.featureItems()
      .slice(0, 3)
      .map((feature) => feature.title),
  );
}
