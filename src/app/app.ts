import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LANGUAGES, type Lang } from './i18n';
import { I18nService } from './i18n.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  styleUrl: './app-shell.css',
  template: `
<div class="site-chrome" [class.is-scrolled]="scrolled">
<div class="topbar" (mouseenter)="closeProducts()">
  <div class="wrap topbar-content">
    <span class="topbar-msg">
      <svg class="topbar-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10v4h3l4 4V6L7 10H4zm11.5 2c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/></svg>
      {{ i18n.t('topbar.line') }}
    </span>
    <a routerLink="/contact">{{ i18n.t('topbar.talk') }} <span aria-hidden="true">&rarr;</span></a>
  </div>
</div>
<header class="site-header" (mouseleave)="closeProducts()">
  <div class="wrap nav site-nav">
    <a class="brand-lockup" routerLink="/" aria-label="AmpleLite home" (click)="closeMenu()" (mouseenter)="closeProducts()">
      <img class="brand-mark" src="/amplelite-assets/amplelite-logo.png" alt="AmpleLite">
      <span class="brand-edition">{{ i18n.t('brand.edition') }}</span>
    </a>
    <div class="nav-end">
    <nav [attr.aria-label]="i18n.t('nav.main')" [class.is-open]="menuOpen">
      <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }" (click)="closeMenu()" (mouseenter)="closeProducts()">{{ i18n.t('nav.home') }}</a>
      <a routerLink="/platform" routerLinkActive="is-active" (click)="closeMenu()" (mouseenter)="closeProducts()">{{ i18n.t('nav.platform') }}</a>
      <div class="dropdown">
        <button
          class="drop-toggle"
          type="button"
          (mouseenter)="openProducts()"
          (click)="toggleProducts($event)"
          [class.active]="productsOpen"
          aria-haspopup="true"
          [attr.aria-expanded]="productsOpen"
        >
          {{ i18n.t('nav.products') }} <span class="caret" aria-hidden="true"></span>
        </button>
      </div>
      <a class="header-cta mobile-cta" routerLink="/contact" (click)="closeMenu()" (mouseenter)="closeProducts()">{{ i18n.t('nav.getStarted') }}</a>
    </nav>
    <div class="lang-switch" (click)="$event.stopPropagation()">
      <button
        class="lang-toggle"
        type="button"
        (click)="toggleLang($event)"
        [attr.aria-label]="i18n.t('lang.aria')"
        [attr.aria-expanded]="langOpen"
        aria-haspopup="listbox"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
        <span class="lang-code">{{ i18n.current().code }}</span>
        <span class="lang-name">{{ i18n.current().native }}</span>
        <span class="caret" aria-hidden="true"></span>
      </button>
      @if (langOpen) {
        <div class="lang-menu" role="listbox">
          @for (group of i18n.groups; track group.id) {
            <p>{{ i18n.groupLabel(group.id) }}</p>
            @for (id of group.langs; track id) {
              <button type="button" role="option" [class.on]="i18n.lang() === id" [attr.aria-selected]="i18n.lang() === id" (click)="chooseLang(id)">
                <b>{{ option(id).code }}</b>
                <span>{{ option(id).native }}</span>
                <em>{{ option(id).english }}</em>
                @if (i18n.lang() === id) {
                  <svg class="lang-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l5 5 9-11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                }
              </button>
            }
          }
        </div>
      }
    </div>
    <a class="header-cta desktop-cta" routerLink="/contact" (mouseenter)="closeProducts()">{{ i18n.t('nav.getStarted') }}</a>
    <button class="menu-toggle" type="button" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen" [attr.aria-label]="menuOpen ? i18n.t('nav.close') : i18n.t('nav.open')">
      <span [class.on]="menuOpen"></span>
    </button>
    </div>
  </div>
  @if (productsOpen) {
    <div class="drop-menu" role="menu" (mouseenter)="openProducts()">
      <div class="drop-inner">
        <a class="menu-product" routerLink="/products/quality-management" (click)="closeMenu()">
          <span class="menu-icon qms" aria-hidden="true">✓</span>
          <div>
            <b>QMS · {{ i18n.t('cap.qms.name') }}</b>
            <span>{{ i18n.t('menu.qms') }}</span>
          </div>
        </a>
        <a class="menu-product" routerLink="/products/document-management" (click)="closeMenu()">
          <span class="menu-icon dms" aria-hidden="true">▤</span>
          <div>
            <b>DMS · {{ i18n.t('cap.dms.name') }}</b>
            <span>{{ i18n.t('menu.dms') }}</span>
          </div>
        </a>
        <a class="menu-product" routerLink="/products/learning-management" (click)="closeMenu()">
          <span class="menu-icon lms" aria-hidden="true">◉</span>
          <div>
            <b>LMS · {{ i18n.t('cap.lms.name') }}</b>
            <span>{{ i18n.t('menu.lms') }}</span>
          </div>
        </a>
      </div>
    </div>
  }
</header>
</div>
<router-outlet />
<footer class="site-footer">
  <div class="wrap footer">
    <div class="footer-brand">
      <a class="footer-logo" routerLink="/" aria-label="AmpleLITE home">
        <img src="/amplelite-assets/amplelite-logo-white.png" alt="AmpleLite">
      </a>
      <p class="footer-address">{{ i18n.t('footer.tagline') }}</p>
      <a class="footer-phone" routerLink="/contact">{{ i18n.t('topbar.talk') }}</a>
      <p class="footer-follow">{{ i18n.t('footer.follow') }}</p>
      <div class="footer-social">
        <a href="https://www.linkedin.com/company/amplelogic/" target="_blank" rel="noopener noreferrer" [attr.aria-label]="i18n.t('footer.linkedin')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.09h4.52V24H.24zM8.23 8.09h4.33v2.17h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.54c0-1.8-.03-4.11-2.5-4.11-2.5 0-2.89 1.95-2.89 3.98V24H8.23z"/></svg>
        </a>
        <a href="https://www.amplelogic.com/" target="_blank" rel="noopener noreferrer" [attr.aria-label]="i18n.t('footer.website')">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.4 9h-3.18a15.4 15.4 0 0 0-1.1-5.2A8.03 8.03 0 0 1 19.4 11zM12 4c.9 0 2.2 1.9 2.7 5H9.3C9.8 5.9 11.1 4 12 4zM4.6 13h3.18c.16 1.9.6 3.7 1.1 5.2A8.03 8.03 0 0 1 4.6 13zm3.18-2H4.6A8.03 8.03 0 0 1 8.88 5.8 15.4 15.4 0 0 0 7.78 11zM12 20c-.9 0-2.2-1.9-2.7-5h5.4c-.5 3.1-1.8 5-2.7 5zm2.12-2.8A15.4 15.4 0 0 0 15.22 13h3.18a8.03 8.03 0 0 1-4.28 4.2zM15.22 11a15.4 15.4 0 0 0-1.1-5.2A8.03 8.03 0 0 1 18.4 11h-3.18zM8.88 18.2A15.4 15.4 0 0 0 9.98 13H6.8a8.03 8.03 0 0 0 2.08 5.2z"/></svg>
        </a>
      </div>
    </div>
    <div class="footer-col">
      <h4>{{ i18n.t('footer.company') }}</h4>
      <a routerLink="/platform">{{ i18n.t('footer.platform') }}</a>
      <a routerLink="/" fragment="who">{{ i18n.t('footer.about') }}</a>
    </div>
    <div class="footer-col">
      <h4>{{ i18n.t('footer.products') }}</h4>
      <a routerLink="/products/quality-management">{{ i18n.t('cap.qms.name') }}</a>
      <a routerLink="/products/document-management">{{ i18n.t('cap.dms.name') }}</a>
      <a routerLink="/products/learning-management">{{ i18n.t('cap.lms.name') }}</a>
      <a routerLink="/products">{{ i18n.t('footer.allProducts') }}</a>
    </div>
    <div class="footer-col">
      <h4>{{ i18n.t('footer.getStarted') }}</h4>
      <a routerLink="/contact">{{ i18n.t('footer.founding') }}</a>
      <a routerLink="/contact">{{ i18n.t('footer.contact') }}</a>
    </div>
  </div>
  <div class="copyright">
    <div class="wrap copyright-row">
      <span>{{ i18n.t('footer.copyright') }}</span>
      <a href="https://www.amplelogic.com/" target="_blank" rel="noopener noreferrer">AmpleLogic</a>
    </div>
  </div>
</footer>
`,
})
export class App {
  private readonly router = inject(Router);
  readonly i18n = inject(I18nService);
  productsOpen = false;
  menuOpen = false;
  langOpen = false;
  scrolled = false;

  constructor() {
    this.redirectLegacyHash();
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.menuOpen = false;
      this.productsOpen = false;
      this.langOpen = false;
      this.redirectLegacyHash();
    });
  }

  private redirectLegacyHash(): void {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash.replace('#', '');
    if (hash === 'platform') {
      void this.router.navigateByUrl('/platform', { replaceUrl: true });
    }
  }

  option(id: Lang) {
    return LANGUAGES.find((item) => item.id === id) ?? LANGUAGES[0];
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) this.productsOpen = false;
    this.langOpen = false;
  }

  toggleProducts(event: Event): void {
    event.stopPropagation();
    this.productsOpen = !this.productsOpen;
    this.langOpen = false;
  }

  toggleLang(event: Event): void {
    event.stopPropagation();
    this.langOpen = !this.langOpen;
    this.productsOpen = false;
  }

  chooseLang(id: Lang): void {
    this.i18n.setLang(id);
    this.langOpen = false;
  }

  openProducts(): void {
    this.productsOpen = true;
    this.langOpen = false;
  }

  closeProducts(): void {
    this.productsOpen = false;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.productsOpen = false;
    this.langOpen = false;
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.langOpen = false;
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 8;
  }
}
