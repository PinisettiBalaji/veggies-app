import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
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
    this.animateToCart(event);
  }

  remove() {
    if (this.qty > 0) {
      this.qty--;
      this.cartService.removeItem(this.product);
    }
  }

  animateToCart(event: any) {

    const img = event.target.closest('.card').querySelector('img');
    const cartIcon = document.querySelector('.cart-icon');

    if (!img || !cartIcon) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const clone = img.cloneNode(true) as HTMLElement;
    clone.classList.add('fly-img');

    clone.style.top = imgRect.top + 'px';
    clone.style.left = imgRect.left + 'px';

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.top = cartRect.top + 'px';
      clone.style.left = cartRect.left + 'px';
      clone.style.width = '20px';
      clone.style.height = '20px';
      clone.style.opacity = '0.5';
    }, 10);

    setTimeout(() => {
      clone.remove();
    }, 800);
  }
}