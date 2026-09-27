// Οι τύποι αυτοί χρησιμοποιούνται για ρυθμίσεις routes που αφορούν τον server.
import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './product-data';

// Εδώ ορίζονται routes για το server-side rendering.
export const serverRoutes: ServerRoute[] = [
  {
    // Prerender every product in the shared catalogue.
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return PRODUCTS.map(product => ({ id: String(product.id) }));
    },
  },
  {
    // Το ** σημαίνει "όλα τα routes".
    path: '**',
    // Το Prerender δημιουργεί HTML από πριν για τα routes κατά το build.
    renderMode: RenderMode.Prerender,
  },
];
