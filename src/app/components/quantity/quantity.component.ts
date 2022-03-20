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

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.hidden$ = this.cart.isInCart(this.product.id);
    this.quantity$ = this.cart.getCartQuantityById(this.product.id);
  }

  addToCart(): void {
    this.cart.addToCart(this.product, 1);
    this.quantityIncreased.emit(true);
  }

  increaseQuantity(quantity: string): void {
    const quant = Number(quantity);
    this.cart.addToCart(this.product, quant);
    this.quantityIncreased.emit(true);
  }

  removeFromCart(): void {
    this.cart.removeFromCart(this.product);
    this.removedFromCart.emit(true);
  }

}
