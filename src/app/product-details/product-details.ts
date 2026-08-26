// Το Component δηλώνει Angular component.
import { Component } from '@angular/core';
// Το ActivatedRoute μάς δίνει πρόσβαση στα δεδομένα του τρέχοντος route.
import { ActivatedRoute } from '@angular/router';
// Το CartService χρησιμοποιείται για προσθήκη προϊόντων στο καλάθι.
import { CartService } from '../cart';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})

export class ProductDetailsComponent {
  // Τοπική λίστα προϊόντων από όπου βρίσκουμε το προϊόν που αντιστοιχεί στο id του URL.
  products = [
    { id: 1, name: 'Laptop', price: 900, 
      image: 'assets/images/laptop.jpg', 
      description: 'Ιδανικό για εργασία, σπουδές και καθημερινή χρήση.'},
    { id: 2, name: 'Mouse', price: 25, 
      image: 'assets/images/mouse.jpg',
      description: 'Εργονομικό ποντίκι με άνετο κράτημα, ιδανικό για πολλές ώρες χρήσης στο γραφείο ή στο σπίτι.'
    },
    { id: 3, name: 'Keyboard', price: 60,
      image: 'assets/images/keyboard.jpg',
      description: 'Πρακτικό πληκτρολόγιο με άνετα πλήκτρα και μοντέρνο σχεδιασμό για γρήγορη και ξεκούραστη πληκτρολόγηση.'
     }
  ];

  // state: αποθηκεύουμε το id που παίρνουμε από το route.
  productId: string | null = '';
  // state: εδώ θα κρατήσουμε το προϊόν που βρέθηκε, αν υπάρχει.
  selectedProduct: 
    | {id: number; name: string; price:number; image: string; description: string;}
    | undefined;
  

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
