import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from '../i18n.service';

export type ConnectKind = 'qms' | 'dms' | 'lms' | 'home';

@Component({
  selector: 'app-platform-connect',
  imports: [RouterLink],
  template: `
    <div class="connect" [attr.data-kind]="kind()">
      @if (kind() === 'home') {
        <div class="home-eco">
          <div class="hub">
            <span>AmpleLite</span>
          </div>
          <div class="arms" aria-hidden="true">
            <i class="l"></i><i class="r"></i><i class="b"></i>
          </div>
          <a class="node qms" routerLink="/products/quality-management">
            <b>QMS</b>
            <span>{{ i18n.t('home.qms.h3') }}</span>
          </a>
          <a class="node dms" routerLink="/products/document-management">
            <b>DMS</b>
            <span>{{ i18n.t('home.dms.h3') }}</span>
          </a>
          <a class="node lms" routerLink="/products/learning-management">
            <b>LMS</b>
            <span>{{ i18n.t('home.lms.h3') }}</span>
          </a>
        </div>
      } @else {
        <div class="mod-grid">
          <a
            class="mod-card"
            routerLink="/products/quality-management"
            [class.is-current]="kind() === 'qms'"
          >
            <span class="mod-code">QMS</span>
            <b>{{ i18n.t('home.qms.h3') }}</b>
            <span class="mod-copy">{{ i18n.t('home.qms.short') }}</span>
            @if (kind() === 'qms') {
              <em>{{ i18n.t('cap.current') }}</em>
            }
          </a>
          <a
            class="mod-card"
            routerLink="/products/document-management"
            [class.is-current]="kind() === 'dms'"
          >
            <span class="mod-code">DMS</span>
            <b>{{ i18n.t('home.dms.h3') }}</b>
            <span class="mod-copy">{{ i18n.t('home.dms.short') }}</span>
            @if (kind() === 'dms') {
              <em>{{ i18n.t('cap.current') }}</em>
            }
          </a>
          <a
            class="mod-card"
            routerLink="/products/learning-management"
            [class.is-current]="kind() === 'lms'"
          >
            <span class="mod-code">LMS</span>
            <b>{{ i18n.t('home.lms.h3') }}</b>
            <span class="mod-copy">{{ i18n.t('home.lms.short') }}</span>
            @if (kind() === 'lms') {
              <em>{{ i18n.t('cap.current') }}</em>
            }
          </a>
        </div>
        <p class="note">{{ i18n.t('cap.connect.note') }}</p>
      }
    </div>
  `,
  styleUrl: './platform-connect.css',
})
export class PlatformConnectComponent {
  readonly i18n = inject(I18nService);
  readonly kind = input<ConnectKind>('home');
}
