// Δηλώνει Angular component.
import { Component } from '@angular/core';
// Φέρνουμε το service του καλαθιού για να διαβάζουμε και να αλλάζουμε τα δεδομένα του.
import { CartItem, CartService } from '../cart';


@Component({
  selector: 'app-cart',
  // Δεν χρειάζονται extra imports γιατί το template είναι απλό και δεν χρησιμοποιεί άλλα standalone components/directives.
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})

export class CartComponent {
  // Θα κρατάει τα προϊόντα που υπάρχουν στο καλάθι.
  cartItems: readonly CartItem[] = [];
  // Θα κρατάει το συνολικό κόστος όλων των προϊόντων.
  totalPrice = 0;

  // Στο constructor παίρνουμε το CartService και διαβάζουμε τα items του καλαθιού.
  constructor(private cartService: CartService) {
      // Παίρνουμε τον πίνακα προϊόντων από το service.
      this.cartItems = this.cartService.getItems();
      // υπολογισμός συνόλου όταν φορτώνει το component
      this.calculateTotal();
  }

  readonly maxQuantity = Number.MAX_SAFE_INTEGER;

  changeQuantity(productId: number, change: -1 | 1) {
    this.cartService.changeQuantity(productId, change);
    this.calculateTotal();
  }

  // Αφαιρεί ένα προϊόν με βάση τη θέση του μέσα στον πίνακα.
  removeItem(index:number) {
    this.cartService.removeFromCart(index);
    // ξαναϋπολογίζουμε το σύνολο μετά την αφαίρεση
    this.calculateTotal();
  }

  // Υπολογίζει το συνολικό ποσό του καλαθιού.
  calculateTotal() {
    // Για κάθε item υπολογίζει τιμή x ποσότητα και τα προσθέτει όλα μαζί.
    this.totalPrice =  this.cartItems.reduce((sum,item) => sum + item.price * item.quantity, 0);
  }
}
