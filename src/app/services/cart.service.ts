import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { IProduct } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<IProduct[]>(this.initCart());
  cartItems$: Observable<IProduct[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  private initCart(): IProduct[] {
    const cart = localStorage.getItem('CART');
    if(cart) {
      const localCart: IProduct[] = JSON.parse(cart);
      return localCart;
    } else {
      return [];
    }
  }

  private saveToLocalStorage(cart: IProduct[]): void {
    localStorage.setItem('CART', JSON.stringify(cart));
  }

  private addExistingProduct(product: IProduct, cart: IProduct[]): void {
    const newCart = [...cart];
    const replace = cart.findIndex(p => p.id === product.id);

    newCart.splice(replace, 1, product)

    this.cartItemsSubject.next(newCart);
    this.saveToLocalStorage(newCart);
  }

  private addNewProduct(product: IProduct, cart: IProduct[]): void {
    const newCart = [...cart, product];

    this.cartItemsSubject.next(newCart);
    this.saveToLocalStorage(newCart);
  }

  addToCart(product: IProduct, quantity: number): void {

    if (+quantity < 1) {
      return;
    }

    const currCart = this.cartItemsSubject.value;
    const productExists = currCart.find(p => p.id === product.id);
    const productWithQuant = {...product, quantity}

    if (productExists) {
      this.addExistingProduct(productWithQuant, currCart);
    }

    if (!productExists) {
      this.addNewProduct(productWithQuant, currCart);
    }

  }

  removeFromCart(product: IProduct): void {
    const cart = this.cartItemsSubject.value;
    const index = cart.findIndex(p => p.id === product.id);
    cart.splice(index, 1);
    this.cartItemsSubject.next(cart);
    this.saveToLocalStorage(cart);
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

  isInCart(id: number): Observable<boolean> {
    return this.getCartQuantityById(id).pipe(
      map(quantity => !!quantity)
    )
  }

}
