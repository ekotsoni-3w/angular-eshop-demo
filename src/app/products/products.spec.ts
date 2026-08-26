// Εργαλεία testing για Angular component tests.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

// Το component που ελέγχουμε.
import { ProductsComponent } from './products';

describe('Products', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    // Ρυθμίζει το test περιβάλλον και κάνει import το standalone component.
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    // Δημιουργεί το component στο test DOM.
    fixture = TestBed.createComponent(ProductsComponent);
    // Παίρνει το instance της κλάσης.
    component = fixture.componentInstance;
    // Περιμένει να ολοκληρωθεί η αρχικοποίηση.
    await fixture.whenStable();
  });

  it('should create', () => {
    // Ελέγχει ότι το component κατασκευάστηκε σωστά.
    expect(component).toBeTruthy();
  });
});
