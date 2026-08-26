// Το ApplicationConfig περιγράφει τις γενικές ρυθμίσεις της Angular εφαρμογής.
import { ApplicationConfig } from '@angular/core';
// Το provideRouter ενεργοποιεί το Angular Router.
import { provideRouter } from '@angular/router';
// Φέρνουμε τον πίνακα με όλα τα routes του app.
import { routes } from './app.routes';

// Εδώ δηλώνουμε global providers που θα ισχύουν σε όλη την εφαρμογή.
export const appConfig: ApplicationConfig = {
  // Ενεργοποιεί το routing χρησιμοποιώντας τα routes που ορίσαμε στο app.routes.ts.
  providers: [provideRouter(routes)]
};
