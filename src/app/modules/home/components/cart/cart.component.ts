import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(public cartService: CartService) { }

  checkout() {

    const cart = this.cartService.getCart();

    let msg = '🛒 *Order Details* %0A';

    cart.forEach(item => {
      msg += `${item.name} - ${item.qty} x ₹${item.price} = ₹${item.qty * item.price} %0A`;
    });

    msg += `%0A Total: ₹${this.cartService.getTotal()}`;
    msg += '%0A Name: ';
    msg += '%0A Address: ';

    const url = `https://wa.me/91XXXXXXXXXX?text=${msg}`;

    window.open(url, '_blank');
  }

  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }
}