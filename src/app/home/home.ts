// Δηλώνει ότι η κλάση αυτή θα είναι Angular component.
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  // Το selector είναι το tag που θα χρησιμοποιούσαμε αν θέλαμε να καλέσουμε το component μέσα σε άλλο template.
  selector: 'app-home',
  // RouterLink connects the hero and category links to product routes.
  imports: [RouterLink],
  // Το HTML template του component.
  templateUrl: './home.html',
  // Το CSS που ισχύει μόνο για αυτό το component.
  styleUrl: './home.css',
})
// Η κλάση είναι άδεια γιατί όλο το περιεχόμενο της αρχικής είναι στατικό προς το παρόν.
export class HomeComponent {}
