// Το Injectable δηλώνει ότι αυτή η κλάση μπορεί να χρησιμοποιηθεί σαν Angular service.
import { Injectable } from '@angular/core';

@Injectable({
  // providedIn: 'root' σημαίνει ότι υπάρχει ένα κοινό instance για όλο το app.
  providedIn: 'root'
})
export class CartService {
  // state: προϊόντα στο καλάθι με ποσότητα.
  items: { id: number; name: string; price: number; quantity: number }[] = [];

  // action: προσθέτει προϊόν στο καλάθι.
  addToCart(product: { id: number; name: string; price: number }) {
    // Ψάχνει αν το προϊόν υπάρχει ήδη στο καλάθι.
    const existingItem = this.items.find(item => item.id === product.id);

    // Αν υπάρχει ήδη, αυξάνουμε μόνο την ποσότητα.
    if (existingItem) {
      existingItem.quantity++;
    } else {
      // Αν δεν υπάρχει, προσθέτουμε νέο αντικείμενο με αρχική ποσότητα 1.
      this.items.push({ ...product, quantity: 1 });
    }
  }

  // Επιστρέφει όλα τα items του καλαθιού.
  getItems() {
    return this.items;
  }

  // Αφαιρεί item από συγκεκριμένη θέση του πίνακα.
  removeFromCart(index: number) {
    this.items.splice(index, 1);
  }

  // Επιστρέφει το συνολικό πλήθος τεμαχίων στο καλάθι.
  getItemsCount() {
    // Το reduce προσθέτει όλες τις ποσότητες σε έναν τελικό αριθμό.
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
