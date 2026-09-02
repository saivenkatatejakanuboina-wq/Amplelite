import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { PlatformPageComponent } from './platform-page.component';
import { CapabilityPageComponent } from './capability-page.component';
import { ProductOverviewComponent } from './product-overview.component';
import { InfoPageComponent } from './info-page.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AmpleLITE | Digital Quality Foundation for Life Sciences' },
  { path: 'platform', component: PlatformPageComponent, title: 'Platform | AmpleLITE' },
  { path: 'products', component: ProductOverviewComponent, title: 'Products | AmpleLITE' },
  {
    path: 'products/quality-management',
    component: CapabilityPageComponent,
    data: { capability: 'qms' },
    title: 'Quality Management | AmpleLITE',
  },
  {
    path: 'products/document-management',
    component: CapabilityPageComponent,
    data: { capability: 'dms' },
    title: 'Document Management | AmpleLITE',
  },
  {
    path: 'products/learning-management',
    component: CapabilityPageComponent,
    data: { capability: 'lms' },
    title: 'Learning Management | AmpleLITE',
  },
  { path: 'qms', redirectTo: 'products/quality-management', pathMatch: 'full' },
  { path: 'dms', redirectTo: 'products/document-management', pathMatch: 'full' },
  { path: 'lms', redirectTo: 'products/learning-management', pathMatch: 'full' },
  { path: 'why', redirectTo: '', pathMatch: 'full' },
  { path: 'contact', component: InfoPageComponent, title: 'Contact | AmpleLITE' },
  { path: '**', redirectTo: '' },
];
