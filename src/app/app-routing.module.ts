import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartHomeComponent } from './components/cart-home/cart-home.component';
import { CheckoutHomeComponent } from './components/checkout-home/checkout-home.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { LoginHomeComponent } from './components/login-home/login-home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { RegisterHomeComponent } from './components/register-home/register-home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    component: ProductsHomeComponent
  },
  {
    path: 'products/:productId',
    component: ProductDetailComponent
  },
  {
    path: 'cart',
    component: CartHomeComponent
  },
  {
    path: 'login',
    component: LoginHomeComponent
  },
  {
    path: 'register',
    component: RegisterHomeComponent
  },
  {
    path: 'checkout',
    component: CheckoutHomeComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
