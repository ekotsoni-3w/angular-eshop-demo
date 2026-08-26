// Εργαλεία testing για Angular components.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Το component που θα δοκιμάσουμε.
import { CartComponent } from './cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    // Ρυθμίζει το test module και κάνει import το standalone component.
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents();

    // Δημιουργεί το component για το test.
    fixture = TestBed.createComponent(CartComponent);
    // Παίρνει το instance της κλάσης CartComponent.
    component = fixture.componentInstance;
    // Περιμένει να ολοκληρωθούν τυχόν async εργασίες του component.
    await fixture.whenStable();
  });

  it('should create', () => {
    // Ελέγχει ότι το component δημιουργήθηκε επιτυχώς.
    expect(component).toBeTruthy();
  });
});
