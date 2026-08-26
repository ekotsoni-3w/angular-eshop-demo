// Το Component δηλώνει ότι αυτή η κλάση θα χρησιμοποιηθεί σαν Angular component.
import { Component } from '@angular/core';
// Το RouterLink φτιάχνει links για navigation και το RouterOutlet δείχνει το component του ενεργού route.
import { RouterLink, RouterOutlet } from '@angular/router';
// Το CartService κρατά τα δεδομένα του καλαθιού και τις σχετικές ενέργειες.
import { CartService } from './cart';

@Component({
  // Το selector είναι το custom HTML tag που αντιστοιχεί σε αυτό το component.
  selector: 'app-root',
  // Επειδή είναι standalone component, δηλώνουμε εδώ όσα Angular features χρειάζεται το template.
  imports: [RouterLink, RouterOutlet],
  // Συνδέει την κλάση με το HTML template.
  templateUrl: './app.html',
  // Συνδέει την κλάση με το CSS του component.
  styleUrl: './app.css'
})
export class AppComponent {
  // Με dependency injection παίρνουμε πρόσβαση στο CartService μέσα στο component.
  constructor(private cartService: CartService) {}

  // Επιστρέφει πόσα τεμάχια υπάρχουν συνολικά στο καλάθι.
  getCartCount() {
    return this.cartService.getItemsCount();
  }
}
