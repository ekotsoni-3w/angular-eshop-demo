// Οι τύποι αυτοί χρησιμοποιούνται για ρυθμίσεις routes που αφορούν τον server.
import { RenderMode, ServerRoute } from '@angular/ssr';

// Εδώ ορίζονται routes για το server-side rendering.
export const serverRoutes: ServerRoute[] = [
  {
    // Δημιουργούμε εκ των προτέρων τις τρεις δυναμικές σελίδες προϊόντων.
    path: 'products/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return [{ id: '1' }, { id: '2' }, { id: '3' }];
    },
  },
  {
    // Το ** σημαίνει "όλα τα routes".
    path: '**',
    // Το Prerender δημιουργεί HTML από πριν για τα routes κατά το build.
    renderMode: RenderMode.Prerender,
  },
];
