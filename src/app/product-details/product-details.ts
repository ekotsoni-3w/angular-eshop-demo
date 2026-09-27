// Το Component δηλώνει Angular component.
import { Component } from '@angular/core';
// Το ActivatedRoute μάς δίνει πρόσβαση στα δεδομένα του τρέχοντος route.
import { ActivatedRoute } from '@angular/router';
// Το CartService χρησιμοποιείται για προσθήκη προϊόντων στο καλάθι.
import { CartService } from '../cart';
import { PRODUCTS, Product } from '../product-data';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

export class ProductDetailsComponent {
  readonly products = PRODUCTS;
  productId: string | null = null;
  selectedProduct: Product | undefined;

  // action: παίρνουμε το route και διαβάζουμε το id από το URL.
  constructor(private route: ActivatedRoute,
    private cartService: CartService
  ) {
    // Διαβάζει το route parameter με όνομα "id" από το URL, π.χ. /products/2.
    this.productId = this.route.snapshot.paramMap.get('id');
    // Το route parameter έρχεται σαν string, οπότε το μετατρέπουμε σε number.
    const numId = Number(this.productId);
    // Ψάχνουμε στη λίστα products για το προϊόν που έχει το ίδιο id.
    this.selectedProduct = this.products.find(product => product.id === numId);
  }

  // Προσθέτει στο καλάθι το προϊόν που εμφανίζεται αυτή τη στιγμή στα details.
  addToCart() {
    // Ελέγχουμε πρώτα ότι όντως βρέθηκε προϊόν πριν καλέσουμε το service.
    if (this.selectedProduct) {
      this.cartService.addToCart(this.selectedProduct);
    }
  }
}
