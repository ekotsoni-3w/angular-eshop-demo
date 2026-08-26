// Εργαλεία που χρειάζεται το Angular για server-side rendering μέσα από Node.
import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
// Ο Express δημιουργεί τον web server.
import express from 'express';
// Η join βοηθάει να φτιάχνουμε σωστά file paths.
import { join } from 'node:path';

// Δείχνει τον φάκελο όπου βρίσκονται τα static αρχεία του build για τον browser.
const browserDistFolder = join(import.meta.dirname, '../browser');

// Δημιουργεί την Express εφαρμογή.
const app = express();
// Δημιουργεί τον Angular engine που θα κάνει render τα Angular pages στον server.
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  // Σερβίρει εικόνες, css, js και άλλα αρχεία που έχουν παραχθεί στο browser build.
  express.static(browserDistFolder, {
    // Ο browser μπορεί να κρατά αυτά τα αρχεία σε cache για 1 χρόνο.
    maxAge: '1y',
    // Δεν ψάχνει αυτόματα για index.html μέσα στους φακέλους.
    index: false,
    // Δεν κάνει αυτόματο redirect σε paths με slash.
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  // Ζητά από τον Angular engine να δημιουργήσει την HTML απάντηση για το request.
  angularApp
    .handle(req)
    .then((response) =>
      // Αν υπάρχει Angular response, τη γράφει στο Express response.
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    // Αν κάτι αποτύχει, το error περνάει στο επόμενο middleware του Express.
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  // Διαβάζει το port από environment variable ή χρησιμοποιεί το 4000 αν δεν υπάρχει.
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    // Αν ο server δεν ξεκινήσει σωστά, σταματάει με error.
    if (error) {
      throw error;
    }

    // Εμφανίζει στην κονσόλα τη διεύθυνση όπου ακούει ο server.
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
// Κάνει export τον handler ώστε να μπορεί να χρησιμοποιηθεί από Angular CLI ή άλλες πλατφόρμες.
export const reqHandler = createNodeRequestHandler(app);
