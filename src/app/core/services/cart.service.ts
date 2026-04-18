import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';

@Injectable({ providedIn: 'root' })
export class CartService {

  cartItems: any[] = [];

  addToCart(product: Product) {
    const item = this.cartItems.find(i => i.id === product.id);
    if (item) {
      item.qty++;
    } else {
      this.cartItems.push({ ...product, qty: 1 });
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter(i => i.id !== id);
  }

  getCart() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}