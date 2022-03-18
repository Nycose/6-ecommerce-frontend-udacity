import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product-model';
import { CartService } from './cart.service';

@Injectable()
export class QuantityService implements OnInit {

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    
  } 

  getQuantityById(productId: number): Observable<number> {
    return this.cart.getCartQuantityById(productId);
  }

  isInCart(productId: number): Observable<boolean> {
    return this.cart.isInCart(productId);
  }

  addToCart(product: IProduct, quantity: number): void {
    this.cart.addToCart(product, quantity);
  }

  removeFromCart(product: IProduct): void {
    this.cart.removeFromCart(product);
  }

}
