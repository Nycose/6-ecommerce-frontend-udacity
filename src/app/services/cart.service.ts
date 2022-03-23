import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, map, Observable, tap, throwError } from 'rxjs';
import { IOrder } from '../models/order-model';
import { IProduct } from '../models/product-model';
import { IUser } from '../models/user-model';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItemsSubject = new BehaviorSubject<IProduct[]>(this._initCart());
  private _lastDeletedItem: IProduct;

  cartItems$: Observable<IProduct[]> = this._cartItemsSubject.asObservable();


  constructor(private _route: Router, private http: HttpClient, private _auth: AuthService, private _loading: LoadingService, private _messageService: MessageService) {}

  private _initCart(): IProduct[] {
    const cart = localStorage.getItem('CART');
    if(cart) {
      return JSON.parse(cart);
    } else {
      return [];
    }
  }

  private _saveToLocalStorage(cart: IProduct[]): void {
    localStorage.setItem('CART', JSON.stringify(cart));
  }

  private _addExistingProduct(product: IProduct): void {
    const cart = this.cartItems;
    const newCart = [...cart];
    const replace = cart.findIndex(p => p.id === product.id);

    newCart.splice(replace, 1, product)

    this._cartItemsSubject.next(newCart);
    this._saveToLocalStorage(newCart);
  }

  private _addNewProduct(product: IProduct): void {
    const newCart = [...this.cartItems, product];

    this._cartItemsSubject.next(newCart);
    this._saveToLocalStorage(newCart);
  }

  private _placeOrder(order: IOrder): Observable<IOrder> {
    const checkout = this.http.post<IOrder>('/api/checkout', order).pipe(
        catchError((err) => {
          const message = err.error;
          this._messageService.showErrors(err, message);
          return throwError(() => new Error(err));
        }),
        tap(() => {
          localStorage.removeItem('CART');
          this._cartItemsSubject.next([]);
        })
      )
    return this._loading.showLoadingUntilComplete(checkout);
  }

  get cartItems(): IProduct[] {
    return this._cartItemsSubject.value;
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
      this._addExistingProduct(cartProduct);
    }

    if (!productExists) {
      this._addNewProduct(cartProduct);
    }

  }

  removeFromCart(product: IProduct): void {
    this._lastDeletedItem = product;
    const cart = this.cartItems;
    const index = cart.findIndex(p => p.id === product.id);
    cart.splice(index, 1);
    this._cartItemsSubject.next(cart);
    this._saveToLocalStorage(cart);
  }

  watchForUndo(ref: MatSnackBarRef<TextOnlySnackBar>): void {
    ref.afterDismissed()
      .pipe(
        filter(action => action.dismissedByAction),
        tap(() => {
          this.addToCart(this._lastDeletedItem, this._lastDeletedItem.quantity);
          this._route.navigateByUrl('/cart');
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

  checkout(user: IUser) {

    const isLoggedIn = this._auth.loginStatus;
    const cart = this.cartItems;

    if (isLoggedIn) {

      const userId = this._auth.userId ?? -1;
      const order = { userId, cart: [...cart] }
      this._placeOrder(order)
        .pipe(
          tap(() => this._route.navigateByUrl(''))
        )
        .subscribe();

    } 

    else {

      this._auth.register(user).subscribe((user) => {

        const order = { userId: user.userId, cart: [...cart] };
        this._placeOrder(order)
          .pipe(
            tap(() => this._route.navigateByUrl(''))
          )
          .subscribe();

      });

    }
    
  }


}
