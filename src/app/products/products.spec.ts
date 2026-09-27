// Εργαλεία testing για Angular component tests.
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

// Το component που ελέγχουμε.
import { ProductsComponent } from './products';
import { CART_STORAGE_KEY, CartService } from '../cart';

beforeEach(() => localStorage.removeItem(CART_STORAGE_KEY));
afterEach(() => localStorage.removeItem(CART_STORAGE_KEY));

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

  function search(query: string) {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input[type="search"]');
    input.value = query;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function selectCategory(category: string) {
    const buttons = Array.from(fixture.nativeElement.querySelectorAll('.category-options button')) as HTMLButtonElement[];
    buttons.find(button => button.textContent?.trim() === category)!.click();
    fixture.detectChanges();
  }

  function names(): string[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.product-title h2'),
      (heading: any) => heading.textContent.trim());
  }

  it('shows the full catalogue initially', () => {
    expect(names()).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('9 products found');
  });

  it('searches names without case or whitespace sensitivity', () => {
    search('  AIRPODS   MAX  ');
    expect(names()).toEqual(['Apple AirPods Max']);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('1 product found');
    search('   ');
    expect(names()).toHaveLength(9);
  });

  it('searches descriptions and categories', () => {
    search('neckband');
    expect(names()).toEqual(['Beats Flex']);
    search('desk essentials');
    expect(names()).toEqual(['Mouse', 'Keyboard']);
  });

  it('combines category and search, keeping search when all categories are selected', () => {
    search('apple');
    selectCategory('Home audio');
    expect(names()).toEqual(['Apple HomePod Mini']);
    const selected = fixture.nativeElement.querySelector('.category-options [aria-pressed="true"]');
    expect(selected.textContent.trim()).toBe('Home audio');
    selectCategory('All products');
    expect(names()).toHaveLength(4);
  });

  it('shows an empty state and clears both controls', () => {
    selectCategory('Desk essentials');
    search('airpods');
    expect(names()).toEqual([]);
    expect(fixture.nativeElement.querySelector('.empty-results').textContent).toContain('No products found');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain('0 products found');
    fixture.nativeElement.querySelector('.clear-filters').click();
    fixture.detectChanges();
    expect(names()).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('input').value).toBe('');
    expect(fixture.nativeElement.querySelector('.category-options [aria-pressed="true"]').textContent.trim()).toBe('All products');
  });

  it('adds the correct product from filtered results', () => {
    search('beats');
    fixture.nativeElement.querySelector('.card-actions button').click();
    expect(TestBed.inject(CartService).getItems()).toEqual([
      expect.objectContaining({ id: 9, name: 'Beats Flex', quantity: 1 }),
    ]);
  });

});
