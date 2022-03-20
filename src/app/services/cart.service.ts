import { Injectable, OnInit } from '@angular/core';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItemsSubject = new BehaviorSubject<IProduct[]>(this._initCart());
  cartItems$: Observable<IProduct[]> = this._cartItemsSubject.asObservable();

  constructor(private _route: Router) {}

  private _initCart(): IProduct[] {
    const cart = localStorage.getItem('CART');
    if(cart) {
      const localCart: IProduct[] = JSON.parse(cart);
      return localCart;
    } else {
      return [];
    }
  }

  private _saveToLocalStorage(cart: IProduct[]): void {
    localStorage.setItem('CART', JSON.stringify(cart));
  }

  private _addExistingProduct(product: IProduct, cart: IProduct[]): void {
    const newCart = [...cart];
    const replace = cart.findIndex(p => p.id === product.id);

    newCart.splice(replace, 1, product)

    this._cartItemsSubject.next(newCart);
    this._saveToLocalStorage(newCart);
  }

  private _addNewProduct(product: IProduct, cart: IProduct[]): void {
    const newCart = [...cart, product];

    this._cartItemsSubject.next(newCart);
    this._saveToLocalStorage(newCart);
  }

  addToCart(product: IProduct, quantity: number | string): void {

    if(typeof quantity === 'string') {
      quantity = Number(quantity);
    }

    if (+quantity < 1) {
      return;
    }

    const currCart = this._cartItemsSubject.value;
    const productExists = currCart.find(p => p.id === product.id);
    const cartProduct = {...product, quantity, total: quantity * product.price}

    if (productExists) {
      this._addExistingProduct(cartProduct, currCart);
    }

    if (!productExists) {
      this._addNewProduct(cartProduct, currCart);
    }

  }

  removeFromCart(product: IProduct): void {
    const cart = this._cartItemsSubject.value;
    const index = cart.findIndex(p => p.id === product.id);
    cart.splice(index, 1);
    this._cartItemsSubject.next(cart);
    this._saveToLocalStorage(cart);
  }

  watchForUndo(ref: MatSnackBarRef<TextOnlySnackBar>, product: IProduct): void {
    ref.afterDismissed()
      .pipe(
        filter(action => action.dismissedByAction),
        tap(() => {
          this.addToCart(product, product.quantity)
          this._route.navigateByUrl('/cart')
        }
        )
      )
      .subscribe()
  }

  getCartQuantity(): Observable<number> {
    return this.cartItems$.pipe(
      map(cart => cart.reduce((acc, curr) => acc + Number(curr.quantity), 0))
    )
  }

  getCartQuantityById(productId: number): Observable<number> {
    return this.cartItems$.pipe(
      map(cart => cart.find(product => product.id === productId)),
      map(product => product?.quantity ?? 0)
    )
  }

  getCartTotalCost(): Observable<number> {
    return this.cartItems$.pipe(
      map(cart => cart.reduce((acc, curr) => acc += curr.total, 0))
    )
  }

  isInCart(id: number): Observable<boolean> {
    return this.getCartQuantityById(id).pipe(
      map(quantity => !!quantity)
    )
  }

}
