// Κάνει import τη συνάρτηση που "ξεκινά" την Angular εφαρμογή στον browser.
import { bootstrapApplication } from '@angular/platform-browser';
// Φέρνει το γενικό configuration της εφαρμογής (π.χ. router, providers).
import { appConfig } from './app/app.config';
// Φέρνει το root component, δηλαδή το πρώτο component που φορτώνει η εφαρμογή.
import { AppComponent } from './app/app';

// Ξεκινά την εφαρμογή με root component το AppComponent και με τις ρυθμίσεις του appConfig.
bootstrapApplication(AppComponent, appConfig)
  // Αν προκύψει κάποιο error στο ξεκίνημα της εφαρμογής, το εμφανίζει στην κονσόλα.
  .catch((err) => console.error(err));
