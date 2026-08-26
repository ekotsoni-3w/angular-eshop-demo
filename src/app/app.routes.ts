// Το Routes είναι ο τύπος που χρησιμοποιεί η Angular για τον πίνακα των routes.
import { Routes } from '@angular/router';
// Κάθε route φορτώνει το αντίστοιχο component.
import { HomeComponent } from './home/home';
import { ProductsComponent } from './products/products';
import { ProductDetailsComponent } from './product-details/product-details';
import { CartComponent } from './cart/cart';

// Εδώ ορίζουμε ποιο component θα εμφανίζεται για κάθε URL path.
export const routes: Routes = [
  // Το κενό path σημαίνει η αρχική σελίδα "/".
  { path: '', component: HomeComponent, title: 'Home' },
  // Όταν το URL είναι "/products", εμφανίζεται η λίστα προϊόντων.
  { path: 'products', component: ProductsComponent, title: 'Products' },
  // Το :id είναι route parameter, δηλαδή παίρνουμε το id του προϊόντος από το URL.
  { path: 'products/:id', component: ProductDetailsComponent, title: 'Product Details'},
  // Όταν το URL είναι "/cart", εμφανίζεται η σελίδα καλαθιού.
  { path: 'cart', component: CartComponent, title: 'Cart' }
];
