// Εργαλεία για Angular component tests.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

// Το component που θέλουμε να δοκιμάσουμε.
import { ProductDetailsComponent } from './product-details';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    // Δημιουργεί test module και κάνει import το standalone component.
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    // Δημιουργεί το component για το test.
    fixture = TestBed.createComponent(ProductDetailsComponent);
    // Παίρνει το instance της κλάσης.
    component = fixture.componentInstance;
    // Περιμένει να σταθεροποιηθεί το component πριν γίνουν assertions.
    await fixture.whenStable();
  });

  it('should create', () => {
    // Ελέγχει ότι το component υπάρχει.
    expect(component).toBeTruthy();
  });
});
