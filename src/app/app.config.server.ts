// Η mergeApplicationConfig ενώνει δύο Angular configs σε ένα.
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
// Ρυθμίσεις που χρειάζονται μόνο όταν η εφαρμογή τρέχει στον server.
import { provideServerRendering, withRoutes } from '@angular/ssr';
// Φέρνουμε το βασικό config του app.
import { appConfig } from './app.config';
// Φέρνουμε τα routes που αφορούν το server rendering.
import { serverRoutes } from './app.routes.server';

// Εδώ ορίζουμε ρυθμίσεις ειδικά για το SSR.
const serverConfig: ApplicationConfig = {
  providers: [
    // Ενεργοποιεί το server rendering και χρησιμοποιεί τα server routes.
    provideServerRendering(withRoutes(serverRoutes))
  ]
};

// Ενώνει το κανονικό app config με το server config σε ένα τελικό configuration.
export const config = mergeApplicationConfig(appConfig, serverConfig);
