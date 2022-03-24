import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/order-model';
import { IProduct } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<IProduct[][]>;

  constructor(private _cart: CartService, private _auth: AuthService) { }

  ngOnInit(): void {
    this._auth.redirectLoggedOutUser();
    this.orders$ = this._cart.getOrders();
  }

}
