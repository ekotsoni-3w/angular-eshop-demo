import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { PRODUCTS } from './product-data';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export const CART_STORAGE_KEY = 'eshop.cart.v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly items: CartItem[] = [];

  constructor() {
    this.restore();
  }

  addToCart(product: { id: number; name: string; price: number }) {
    const existingItem = this.items.find(item => item.id === product.id);
    if (existingItem) {
      if (!Number.isSafeInteger(existingItem.quantity + 1)) return;
      existingItem.quantity++;
    } else {
      this.items.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
    }
    this.persist();
  }

  changeQuantity(productId: number, change: -1 | 1) {
    if (change !== -1 && change !== 1) return;
    const item = this.items.find(item => item.id === productId);
    if (!item) return;
    const quantity = item.quantity + change;
    if (!Number.isSafeInteger(quantity) || quantity < 1) return;
    item.quantity = quantity;
    this.persist();
  }

  getItems(): readonly CartItem[] {
    return this.items;
  }

  removeFromCart(index: number) {
    if (!Number.isInteger(index) || index < 0 || index >= this.items.length) return;
    this.items.splice(index, 1);
    this.persist();
  }

  getItemsCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private restore() {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) return;
      const stored: unknown = JSON.parse(raw);
      if (!stored || typeof stored !== 'object' || !('version' in stored)
        || stored.version !== 1 || !('items' in stored) || !Array.isArray(stored.items)) return;

      for (const entry of stored.items) {
        if (!entry || typeof entry !== 'object' || !Number.isSafeInteger(entry.quantity)
          || entry.quantity <= 0) continue;
        const product = PRODUCTS.find(product => product.id === entry.id);
        if (!product) continue;
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
          const quantity = existing.quantity + entry.quantity;
          if (Number.isSafeInteger(quantity)) existing.quantity = quantity;
        } else {
          // Resolve names and prices from the catalogue, never from stored browser data.
          this.items.push({ id: product.id, name: product.name, price: product.price, quantity: entry.quantity });
        }
      }
    } catch {
      // Invalid JSON or unavailable storage must not prevent shopping.
    }
  }

  private persist() {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({
        version: 1,
        items: this.items.map(({ id, quantity }) => ({ id, quantity })),
      }));
    } catch {
      // Keep the in-memory cart usable if storage is blocked or full.
    }
  }
}
