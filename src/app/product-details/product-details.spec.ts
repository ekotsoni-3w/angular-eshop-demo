// Εργαλεία για Angular component tests.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { PRODUCTS } from '../product-data';
import { CART_STORAGE_KEY, CartService } from '../cart';

beforeEach(() => localStorage.removeItem(CART_STORAGE_KEY));
afterEach(() => localStorage.removeItem(CART_STORAGE_KEY));

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


describe('Product catalogue routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([
        { path: 'products/:id', component: ProductDetailsComponent },
      ])],
    });
  });

  for (const product of PRODUCTS) {
    it(`renders ${product.name} from its URL and adds it to the cart`, async () => {
      const harness = await RouterTestingHarness.create();
      await harness.navigateByUrl(`/products/${product.id}`, ProductDetailsComponent);
      const page = harness.routeNativeElement!;
      expect(page.querySelector('h1')?.textContent).toBe(product.name);
      expect(page.querySelector('.description')?.textContent).toContain(product.description);
      expect(page.querySelector('img')?.getAttribute('src')).toBe(product.image);
      page.querySelector<HTMLButtonElement>('button')!.click();
      expect(TestBed.inject(CartService).getItems()).toEqual([
        expect.objectContaining({ id: product.id, name: product.name, price: product.price, quantity: 1 }),
      ]);
    });
  }

  it('shows the missing-product message for an unknown ID', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/products/9999', ProductDetailsComponent);
    expect(harness.routeNativeElement?.textContent).toContain('Product not found.');
    expect(harness.routeNativeElement?.querySelector('button')).toBeNull();
  });
});
