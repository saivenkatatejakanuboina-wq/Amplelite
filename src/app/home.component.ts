import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { I18nService } from './i18n.service';
import { ProductFaqComponent } from './shared/product-faq.component';
import { FlowIconComponent } from './shared/flow-icon.component';

import { ScrollRevealDirective } from './shared/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductFaqComponent, FlowIconComponent, ScrollRevealDirective],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly i18n = inject(I18nService);
}
