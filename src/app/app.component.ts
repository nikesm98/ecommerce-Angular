import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ProductService } from '../../src/app/services/product.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  cartProducts: any[] = [];
  subTotal: number = 0;

  constructor(private productService: ProductService, private router: Router) {
    this.productService.cartAddedSubject.subscribe(res => {
      this.loadCart();
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  redirectToSale() {
    this.router.navigateByUrl('/sale');
  }

  loadCart() {
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach(element => {
        this.subTotal += element.productPrice;
      });
    });
  }
}
