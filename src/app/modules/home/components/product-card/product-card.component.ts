import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product: any;
  // @Output() add = new EventEmitter();


  qty = 0;

  constructor(private cartService: CartService, private snack: MatSnackBar) { }


  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      const item = cart.find(i => i.id === this.product.id);
      this.qty = item ? item.qty : 0; // 🔥 auto reset
    });
  }
  add() {
    this.qty++;
    this.cartService.addToCart(this.product);
    this.snack.open('Added to cart', 'OK', { duration: 1000 });
  }

  remove() {
    if (this.qty > 0) {
      this.qty--;
      this.cartService.removeItem(this.product);
    }
  }
}