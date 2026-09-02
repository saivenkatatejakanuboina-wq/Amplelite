import { RenderMode, ServerRoute } from '@angular/ssr';

/** Routes prerendered for static Hostinger deployment. */
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Client },
];
