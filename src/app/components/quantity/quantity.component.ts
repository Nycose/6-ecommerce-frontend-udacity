import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  @Input()
  product: IProduct;

  @Output()
  quantityIncreased = new EventEmitter<true>();

  @Output()
  removedFromCart = new EventEmitter<true>();

  hidden$: Observable<boolean>;
  quantity$: Observable<number>;

  constructor(private _cart: CartService) { }

  ngOnInit(): void {
    this.hidden$ = this._cart.isInCart(this.product.id);
    this.quantity$ = this._cart.getCartQuantityById(this.product.id);
  }

  addToCart(): void {
    this._cart.addToCart(this.product, 1);
    this.quantityIncreased.emit(true);
  }

  increaseQuantity(quantity: string): void {
    const quant = Number(quantity);
    this._cart.addToCart(this.product, quant);
    this.quantityIncreased.emit(true);
  }

  removeFromCart(): void {
    this._cart.removeFromCart(this.product);
    this.removedFromCart.emit(true);
  }

}
