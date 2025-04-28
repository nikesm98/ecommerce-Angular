// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { SaleComponent } from './pages/sale/sale.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'sale', component: SaleComponent }
];
