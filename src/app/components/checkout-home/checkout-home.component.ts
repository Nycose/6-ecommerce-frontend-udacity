import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout-home',
  templateUrl: './checkout-home.component.html',
  styleUrls: ['./checkout-home.component.css']
})
export class CheckoutHomeComponent implements OnInit {

  cart$: Observable<IProduct[]>;

  total$: Observable<number>;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cart.cartItems$;
    this.total$ = this.cart.getCartTotalCost();
  }

}
