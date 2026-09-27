import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CART_STORAGE_KEY, CartService } from './cart';
import { PRODUCTS } from './product-data';

 describe('CartService persistence', () => {
  beforeEach(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
    TestBed.configureTestingModule({});
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.removeItem(CART_STORAGE_KEY);
  });

  function createService() {
    return TestBed.runInInjectionContext(() => new CartService());
  }

  it('starts empty without saved data', () => {
    expect(createService().getItems()).toEqual([]);
  });

  it('persists additions and quantities and restores them in a new instance', () => {
    const service = createService();
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[8]);
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!)).toEqual({
      version: 1, items: [{ id: 1, quantity: 2 }, { id: 9, quantity: 1 }],
    });
    const restored = createService();
    expect(restored.getItems()).toEqual(service.getItems());
    expect(restored.getItemsCount()).toBe(3);
    expect(restored.getItems().reduce((total, item) => total + item.price * item.quantity, 0)).toBe(1869);
  });

  it('persists removals including the last item', () => {
    const service = createService();
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[1]);
    service.removeFromCart(0);
    expect(createService().getItems().map(item => item.id)).toEqual([2]);
    service.removeFromCart(0);
    expect(createService().getItems()).toEqual([]);
  });

  it.each(['invalid JSON', 'null', '{}', '[]', '{"version":2,"items":[]}', '{"version":1,"items":null}'])(
    'ignores malformed or unsupported data: %s', raw => {
      localStorage.setItem(CART_STORAGE_KEY, raw);
      expect(createService().getItems()).toEqual([]);
    },
  );

  it('rejects invalid entries and uses catalogue prices and names', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ version: 1, items: [
      null, { id: 999, quantity: 1 }, { id: 2, quantity: -1 },
      { id: 2, quantity: 0 }, { id: 2, quantity: 1.5 }, { id: 2, quantity: '2' },
      { id: 2, quantity: 1e30 }, { id: '1', quantity: 1 },
      { id: 1, quantity: 2, price: 0, name: 'Tampered' }, { id: 1, quantity: 1 },
    ] }));
    expect(createService().getItems()).toEqual([{ id: 1, name: 'Laptop', price: 900, quantity: 3 }]);
  });

  it('keeps the cart usable when storage cannot be read or written', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked'); });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Full'); });
    const service = createService();
    expect(() => service.addToCart(PRODUCTS[0])).not.toThrow();
    expect(service.getItemsCount()).toBe(1);
    expect(() => service.removeFromCart(0)).not.toThrow();
    expect(service.getItems()).toEqual([]);
  });

  it('does not access browser storage on the server', () => {
    TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
    const read = vi.spyOn(Storage.prototype, 'getItem');
    const write = vi.spyOn(Storage.prototype, 'setItem');
    const service = createService();
    service.addToCart(PRODUCTS[0]);
    service.removeFromCart(0);
    expect(read).not.toHaveBeenCalled();
    expect(write).not.toHaveBeenCalled();
  });

  it('persists quantity changes and targets products by ID after a removal', () => {
    const service = createService();
    service.addToCart(PRODUCTS[0]);
    service.addToCart(PRODUCTS[1]);
    service.removeFromCart(0);
    service.changeQuantity(2, 1);
    expect(createService().getItems()).toEqual([{ id: 2, name: 'Mouse', price: 25, quantity: 2 }]);
    service.changeQuantity(2, -1);
    expect(createService().getItems()[0].quantity).toBe(1);
  });

  it('keeps quantities positive and ignores missing products and overflow', () => {
    const service = createService();
    service.addToCart(PRODUCTS[0]);
    service.changeQuantity(1, -1);
    service.changeQuantity(9999, 1);
    expect(service.getItemsCount()).toBe(1);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
      version: 1, items: [{ id: 1, quantity: Number.MAX_SAFE_INTEGER }],
    }));
    const restored = createService();
    restored.changeQuantity(1, 1);
    expect(restored.getItems()[0].quantity).toBe(Number.MAX_SAFE_INTEGER);
  });

});
