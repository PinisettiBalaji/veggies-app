import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {

  cartItems: any[] = [];


  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();


  private updateCart() {
    this.cartSubject.next(this.cartItems);
  }
  addToCart(product: Product) {
    const item = this.cartItems.find(i => i.id === product.id);
    if (item) {
      item.qty++;
    } else {
      this.cartItems.push({ ...product, qty: 1 });
    }
    this.updateCart();
  }

  removeItem(product: any) {
    const item = this.cartItems.find(i => i.id === product.id);

    if (item) {
      item.qty--;

      if (item.qty === 0) {
        this.cartItems = this.cartItems.filter(i => i.id !== product.id);
      }
    }

    this.updateCart();
  }

  getCart() {
    return this.cartItems;
  }

  getTotal() {
    return this.cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();  // 
  }
}