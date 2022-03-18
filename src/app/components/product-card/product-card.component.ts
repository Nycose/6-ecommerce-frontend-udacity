import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input()
  product: IProduct;

  isInCart$: Observable<boolean>;
  quantity$: Observable<number>;

  constructor(public cartService: CartService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isInCart$ = this.cartService.isInCart(this.product.id);
    this.quantity$ = this.cartService.getCartQuantityById(this.product.id);
  }

  addToCart(): void {
    this._snackBar.open(`${this.product.title} added to cart.`, 'DISMISS', {duration: 2500});
    this.cartService.addToCart(this.product, 1);
  }

  removeFromCart(): void {
    this._snackBar
      .open(`${this.product.title} removed from cart.`, 'DISMISS', { duration: 2500 });
    this.cartService.removeFromCart(this.product);
  }

}
