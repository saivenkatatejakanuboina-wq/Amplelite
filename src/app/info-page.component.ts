import { Component, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import { ProductFaqComponent } from './shared/product-faq.component';

@Component({
  selector: 'app-info-page',
  imports: [ProductFaqComponent],
  templateUrl: './info-page.html',
  styleUrl: './info-page.css',
})
export class InfoPageComponent {
  readonly i18n = inject(I18nService);
}
