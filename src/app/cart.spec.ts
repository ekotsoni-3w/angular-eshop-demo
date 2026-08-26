// Εργαλεία testing για services και components.
import { TestBed } from '@angular/core/testing';

// Το service που θα ελέγξουμε.
import { CartService } from './cart';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    // Δημιουργεί το test περιβάλλον Angular.
    TestBed.configureTestingModule({});
    // Παίρνει instance του CartService από το dependency injection system.
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    // Ελέγχει ότι το service δημιουργήθηκε σωστά.
    expect(service).toBeTruthy();
  });
});
