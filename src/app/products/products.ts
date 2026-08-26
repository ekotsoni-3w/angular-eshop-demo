// Το Component μετατρέπει την κλάση σε Angular component.
import { Component } from '@angular/core';
// Το RouterLink χρησιμοποιείται για navigation προς άλλα routes.
import { RouterLink } from '@angular/router';
// Το CartService κρατά την κοινή κατάσταση του καλαθιού.
import { CartService } from '../cart';

@Component({
  selector: 'app-products',
  // Το template χρησιμοποιεί routerLink, οπότε το δηλώνουμε στα imports.
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {
  // Αυτή είναι η τοπική λίστα προϊόντων που εμφανίζεται στη σελίδα.
  products = [
    { id: 1, name: 'Laptop', price: 900, image: 'assets/images/laptop.jpg' },
    { id: 2, name: 'Mouse', price: 25, image: 'assets/images/mouse.jpg' },
    { id: 3, name: 'Keyboard', price: 60, image: 'assets/images/keyboard.jpg' }
  ];

  // Παίρνουμε το service ώστε να μπορούμε να προσθέτουμε προϊόντα στο κοινό καλάθι.
  constructor(private cartService: CartService) {}

  // Η μέθοδος δέχεται ένα προϊόν από το template και το στέλνει στο CartService.
  addToCart(product: { id: number; name: string; price: number; image: string }) {
    // Στέλνουμε μόνο τα στοιχεία που χρειάζεται το καλάθι για την αποθήκευση.
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    });
  }
}
