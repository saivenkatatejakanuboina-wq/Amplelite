import { Component, input } from '@angular/core';
import type { BannerKind } from './product-banner.component';
import { DmsProductVisualComponent } from './dms-product-visual.component';
import { LmsProductVisualComponent } from './lms-product-visual.component';
import { QmsProductVisualComponent } from './qms-product-visual.component';

@Component({
  selector: 'app-product-workflow-visual',
  imports: [DmsProductVisualComponent, LmsProductVisualComponent, QmsProductVisualComponent],
  template: `
    @switch (kind()) {
      @case ('dms') {
        <app-dms-product-visual />
      }
      @case ('lms') {
        <app-lms-product-visual />
      }
      @case ('qms') {
        <app-qms-product-visual />
      }
    }
  `,
})
export class ProductWorkflowVisualComponent {
  readonly kind = input.required<BannerKind>();
}
