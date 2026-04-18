import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { CartService } from 'src/app/core/services/cart.service';
import { SearchService } from 'src/app/core/services/search.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  searchText = '';
  selectedCategory = '';
  filteredProducts: any[] = [];



  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private searchService: SearchService
  ) { }

  ngOnInit() {

    this.productService.getProducts().subscribe({
      next: (res) => {
        console.log('✅ PRODUCTS DATA:', res);
        this.products = res;
        this.filteredProducts = [...res];

      },
      error: (err) => {
        console.error('❌ ERROR LOADING PRODUCTS:', err);
      }
    });

    // Listen to search
    this.searchService.searchText$.subscribe(text => {
      this.filterProducts(text);
    });
  }

  add(product: any) {
    this.cartService.addToCart(product);
  }

  filterProducts(text: string) {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
  }



  // applyFilters() {
  //   console.log('Selected Category:', this.selectedCategory);

  //   if (!this.selectedCategory) {
  //     // Show all
  //     this.filteredProducts = [...this.products];
  //     return;
  //   }

  //   this.filteredProducts = this.products.filter(p =>
  //     p.category?.toLowerCase() === this.selectedCategory.toLowerCase()
  //   );

  //   console.log('Filtered:', this.filteredProducts);
  // }


  applyFilters() {
    return this.filteredProducts.filter(p => {
      return (
        (!this.selectedCategory || p.category === this.selectedCategory) &&
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    });

  }
}