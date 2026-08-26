// Το BootstrapContext δίνει πληροφορίες για το server rendering,
// ενώ το bootstrapApplication ξεκινά την Angular εφαρμογή και στον server.
import { BootstrapContext, bootstrapApplication } from '@angular/platform-browser';
// Φέρνουμε το βασικό component της εφαρμογής.
import { AppComponent } from './app/app';
// Φέρνουμε το configuration που χρησιμοποιείται ειδικά για server rendering.
import { config } from './app/app.config.server';

// Δημιουργούμε μία συνάρτηση που θα ξεκινά την Angular εφαρμογή στον server.
const bootstrap = (context: BootstrapContext) =>
    // Το context περνάει στο bootstrap ώστε ο server να ξέρει πώς να κάνει render τη σελίδα.
    bootstrapApplication(AppComponent, config, context);

// Το export default επιτρέπει στον Angular server να χρησιμοποιήσει αυτή τη συνάρτηση σαν entry point.
export default bootstrap;
