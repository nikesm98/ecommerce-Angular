import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

interface Product {
  productId: number;
  productName: string;
  productPrice: number;
  productImageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];

  cartObj = {
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 1,
    AddedDate: new Date().toISOString()  // auto-set current date
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (result: any) => {
        this.productList = result.data;
      },
      error: (error) => {
        console.error('Failed to load products:', error);
      }
    });
  }

  addItemToCart(productId: number): void {
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe({
      next: (result: any) => {
        if (result.result) {
          alert('Product Added To Cart');
          this.productService.cartAddedSubject.next(true);
        }
      },
      error: (error) => {
        console.error('Failed to add product to cart:', error);
      }
    });
  }
}
