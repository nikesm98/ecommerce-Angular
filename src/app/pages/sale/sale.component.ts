import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css'],
})
export class SaleComponent implements OnInit {
  cartProducts: any[] = [];
  subTotal: number = 0;

  saleObj = {
    SaleId: 0,
    CustId: 1,
    SaleDate: new Date(),
    TotalInvoiceAmount: 0,
    Discount: 0,
    PaymentNaration: 'Patmm ',
    DeliveryAddress1: 'Plot no 122',
    DeliveryAddress2: 'Near ATM',
    DeliveryCity: 'Pune',
    DeliveryPinCode: '440033',
    DeliveryLandMark: 'ATM',
  };

  // ✅ Modern DI using `inject()` in Angular 14+
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.subTotal = 0;
    this.productService.getCartItemsByCustId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      this.cartProducts.forEach((item) => {
        this.subTotal += item.productPrice;
      });
    });
  }

  RemoveItem(id: number): void {
    this.productService.removeCartItemById(id).subscribe((res: any) => {
      if (res.result) {
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    });
  }

  makeSale(): void {
    this.saleObj.TotalInvoiceAmount = this.subTotal;

    this.productService.makeSale(this.saleObj).subscribe((res: any) => {
      if (res.result) {
        alert('Sale Success');
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    });
  }
}
