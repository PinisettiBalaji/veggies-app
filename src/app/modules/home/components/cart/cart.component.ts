import { Component } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent {

  constructor(public cartService: CartService) {}

  order() {
    const cart = this.cartService.getCart();

    let msg = '🛒 *Order Details* %0A';

    cart.forEach(i => {
      msg += `${i.name} - ${i.qty} ${i.unit} = ₹${i.price * i.qty} %0A`;
    });

    msg += `%0A Total: ₹${this.cartService.getTotal()}`;
    msg += '%0A Name: ';
    msg += '%0A Address: ';
    msg += '%0A Phone: ';

    const url = `https://wa.me/91XXXXXXXXXX?text=${msg}`;
    window.open(url, '_blank');
  }
}