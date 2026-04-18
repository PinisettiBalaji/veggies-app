import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() add = new EventEmitter();

  addToCart() {
    this.add.emit(this.product);
  }
}