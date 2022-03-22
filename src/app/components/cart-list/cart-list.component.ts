import {  Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  columnsToDisplay = ['product', 'price', 'quantity', 'total', 'remove']

  cart$: Observable<IProduct[]>;
  quantity$: Observable<number>;
  total$: Observable<number>;

  constructor(private _cart: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cart$ = this._cart.cartItems$;
    this.quantity$ = this._cart.getCartQuantity();
    this.total$ = this._cart.getCartTotalCost();
  }

  addToCart(product: IProduct, quantity: string): void {
    this._snackBar.open(`${product.title} added to cart.`, 'DISMISS', {duration: 2500});
    this._cart.addToCart(product, quantity);
  }

  removeFromCart(product: IProduct): void {
    const snackRef = this._snackBar.open(`${product.title} removed from cart.`, 'UNDO', {duration: 3000});
    this._cart.watchForUndo(snackRef);
      
    this._cart.removeFromCart(product);
  }

}
