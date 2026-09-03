import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from './i18n.service';
import { PlatformCapabilitiesComponent } from './shared/platform-capabilities.component';
import { ProductRoadmapComponent } from './shared/product-roadmap.component';

@Component({
  selector: 'app-platform-page',
  imports: [RouterLink, PlatformCapabilitiesComponent, ProductRoadmapComponent],
  templateUrl: './platform-page.html',
  styleUrl: './platform-page.css',
})
export class PlatformPageComponent {
  readonly i18n = inject(I18nService);
}
