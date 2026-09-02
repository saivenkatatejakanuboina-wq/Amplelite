import { Component, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import { PlatformCapabilitiesComponent } from './shared/platform-capabilities.component';
import { ProductFaqComponent } from './shared/product-faq.component';

@Component({
  selector: 'app-product-overview',
  imports: [PlatformCapabilitiesComponent, ProductFaqComponent],
  templateUrl: './product-overview.html',
  styleUrl: './product-overview.css',
})
export class ProductOverviewComponent {
  readonly i18n = inject(I18nService);
}
