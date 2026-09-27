// Εργαλεία testing για Angular components.
import { ComponentFixture, TestBed } from '@angular/core/testing';

// Το component που θα δοκιμάσουμε.
import { CartComponent } from './cart';
import { CART_STORAGE_KEY, CartService } from '../cart';
import { PRODUCTS } from '../product-data';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    // Ρυθμίζει το test module και κάνει import το standalone component.
    await TestBed.configureTestingModule({
      imports: [CartComponent],
    }).compileComponents();

    // Δημιουργεί το component για το test.
    const service = TestBed.inject(CartService);
    service.addToCart(PRODUCTS[1]);
    service.addToCart(PRODUCTS[2]);
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

  afterEach(() => localStorage.removeItem(CART_STORAGE_KEY));

  it('updates quantity, line price, total, count and storage using the buttons', () => {
    const service = TestBed.inject(CartService);
    fixture.detectChanges();
    const row: HTMLElement = fixture.nativeElement.querySelector('.receipt-row');
    const decrease = row.querySelector<HTMLButtonElement>('.decrease')!;
    expect(decrease.disabled).toBe(true);
    row.querySelector<HTMLButtonElement>('.increase')!.click();
    fixture.detectChanges();
    expect(row.querySelector('.item-qty')!.textContent).toBe('2');
    expect(row.querySelector('.item-price')!.textContent).toContain('50 €');
    expect(fixture.nativeElement.querySelector('.receipt-total strong').textContent).toContain('110 €');
    expect(service.getItemsCount()).toBe(3);
    expect(decrease.disabled).toBe(false);
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!).items).toEqual([
      { id: 2, quantity: 2 }, { id: 3, quantity: 1 },
    ]);
    decrease.click();
    fixture.detectChanges();
    expect(row.querySelector('.item-qty')!.textContent).toBe('1');
    expect(fixture.nativeElement.querySelector('.receipt-total strong').textContent).toContain('85 €');
    expect(service.getItemsCount()).toBe(2);
    expect(decrease.disabled).toBe(true);
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!).items[0].quantity).toBe(1);
    row.querySelector<HTMLButtonElement>('.remove-btn')!.click();
    fixture.detectChanges();
    expect(service.getItems().map(item => item.id)).toEqual([3]);
    expect(fixture.nativeElement.querySelector('.receipt-total strong').textContent).toContain('60 €');
  });

});
