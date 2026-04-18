import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  location: string = '';
  address: string = '';
  timeslot: string = '';
  deliveryFee = 50;

  constructor(public cartService: CartService, private authService: AuthService) { }

  checkout() {

    if ( !this.address || !this.timeslot) {
      alert('Please fill all details');
      return;
    }

    const cart = this.cartService.getCart();
    const user = this.authService.getUser();

    let message = `🛒 *FreshMart Order* %0A%0A`;
    message += `━━━━━━━━━━━━━━━ %0A`;
    message += `📦 *Items:* %0A%0A`;

    cart.forEach(item => {
      message += `• ${item.name} (${item.quantityLabel || item.unit}) %0A`;
      message += `   Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price} %0A%0A`;
    });

    const total = this.cartService.getTotal();
    const finalTotal = total + this.deliveryFee;

    message += `━━━━━━━━━━━━━━━ %0A`;
    message += `💰 *Items Total:* ₹${total} %0A%0A`;
    message += `🚚 Delivery Fee: ₹${this.deliveryFee} %0A`;
    message += `💵 *Final Total:* ₹${finalTotal} %0A%0A`;

    message += `👤 *Customer Details:* %0A`;
    message += `📞 Mobile: ${user?.mobile || ''} %0A`;
    // message += `📍 Location: ${this.location} %0A`;
    message += `👉 Please share live location on WhatsApp for better accuracy %0A%0A`;
    message += `🏠 Address: ${this.address} %0A%0A`;

    message += `⏰ *Delivery Slot:* ${this.timeslot} %0A%0A`;
    message += `🙏 Thank you!`;

    const phone = '9182931819';
    const url = `https://wa.me/${phone}?text=${message}`;

    window.open(url, '_blank');
  }

  clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
    }
  }


  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          console.log('Lat:', lat, 'Lng:', lng);

          // Optional: show lat/lng
          this.location = `Lat: ${lat}, Lng: ${lng}`;

          // 🔥 OPTIONAL: convert to address (see below)

        },
        (error) => {
          alert('Location permission denied ❌');
        }
      );
    }
  }
}