import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Injectable, PLATFORM_ID, afterNextRender, computed, inject, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { LANG_GROUPS, LANGUAGES, MESSAGES, type Lang, type MsgKey } from './i18n';

const STORAGE_KEY = 'amplelite-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly app = inject(ApplicationRef);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  readonly lang = signal<Lang>('en');
  readonly languages = LANGUAGES;
  readonly groups = LANG_GROUPS;
  private readonly table = computed(() => MESSAGES[this.lang()]);

  constructor() {
    this.applyDocument(this.lang());
    afterNextRender(() => {
      const saved = this.isBrowser ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (saved && LANGUAGES.some((item) => item.id === saved)) {
        this.setLang(saved as Lang);
      }
    });
  }

  t(key: MsgKey): string {
    const table = this.table();
    return table[key] ?? MESSAGES.en[key] ?? key;
  }

  current() {
    const id = this.lang();
    return LANGUAGES.find((item) => item.id === id) ?? LANGUAGES[0];
  }

  groupLabel(id: 'americas' | 'asia' | 'middleEast'): string {
    if (id === 'americas') return this.t('lang.americas');
    if (id === 'asia') return this.t('lang.asia');
    return this.t('lang.middleEast');
  }

  setLang(id: Lang): void {
    this.lang.set(id);
    this.applyDocument(id);
    if (this.isBrowser) {
      window.localStorage.setItem(STORAGE_KEY, id);
      queueMicrotask(() => this.app.tick());
    } else {
      this.app.tick();
    }
  }

  private applyDocument(id: Lang): void {
    const meta = LANGUAGES.find((item) => item.id === id);
    if (!meta) return;
    this.document.documentElement.lang = meta.html;
    this.document.documentElement.dir = meta.dir;
    this.title.setTitle(this.t('meta.title'));
    const desc = this.t('meta.desc');
    this.meta.updateTag({ name: 'description', content: desc });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: this.t('meta.title') });
    this.meta.updateTag({ property: 'og:description', content: desc });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }
}
