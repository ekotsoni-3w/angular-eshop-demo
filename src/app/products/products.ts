// Το Component μετατρέπει την κλάση σε Angular component.
import { Component, computed, signal } from '@angular/core';
// Το RouterLink χρησιμοποιείται για navigation προς άλλα routes.
import { RouterLink } from '@angular/router';
// Το CartService κρατά την κοινή κατάσταση του καλαθιού.
import { CartService } from '../cart';
import { PRODUCTS, Product } from '../product-data';

@Component({
  selector: 'app-products',
  // Το template χρησιμοποιεί routerLink, οπότε το δηλώνουμε στα imports.
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css', './product-filters.css']
})
export class ProductsComponent {
  readonly products = PRODUCTS;
  readonly categories = [...new Set(PRODUCTS.map(product => product.category))];
  readonly searchQuery = signal('');
  readonly selectedCategory = signal('');
  readonly hasFilters = computed(() => this.searchQuery() !== '' || this.selectedCategory() !== '');
  readonly filteredProducts = computed(() => {
    const terms = this.searchQuery().trim().toLowerCase().split(/\s+/).filter(Boolean);
    return this.products.filter(product => {
      const searchableText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return (!this.selectedCategory() || product.category === this.selectedCategory())
        && terms.every(term => searchableText.includes(term));
    });
  });

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
  }

  // Παίρνουμε το service ώστε να μπορούμε να προσθέτουμε προϊόντα στο κοινό καλάθι.
  constructor(private cartService: CartService) {}

  // Η μέθοδος δέχεται ένα προϊόν από το template και το στέλνει στο CartService.
  addToCart(product: Product) {
    // Στέλνουμε μόνο τα στοιχεία που χρειάζεται το καλάθι για την αποθήκευση.
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price
    });
  }
}
