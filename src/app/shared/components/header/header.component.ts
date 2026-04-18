import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  cartCount = 0;


  constructor(private searchService: SearchService, private router: Router, private cartService: CartService) { }



  ngOnInit() {
    this.cartService.cart$.subscribe(cart => {
      this.cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
    });

  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  onSearch(event: any) {
    const value = event.target.value;
    this.searchService.setSearch(value);
  }

}
