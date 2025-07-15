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

  get cartCount(): number {
    return this.cart.length;
  }
}
