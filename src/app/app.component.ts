import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];
  showCart = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('/api/product/all').subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product) {
    this.cart.push(product);
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  get cartCount(): number {
    return this.cart.length;
  }

  get groupedCartItems(): { product: Product; quantity: number }[] {
    const map = new Map<number, { product: Product; quantity: number }>();

    this.cart.forEach(p => {
      if (map.has(p.id)) {
        map.get(p.id)!.quantity += 1;
      } else {
        map.set(p.id, { product: p, quantity: 1 });
      }
    });

    return Array.from(map.values());
  }

  get totalCartPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}
