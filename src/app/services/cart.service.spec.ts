import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { concatMap, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

import { CartService } from './cart.service';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

describe('CartService', () => {
  let cartService: CartService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {

    const auth = jasmine.createSpyObj(AuthService, ['']);
    const message = jasmine.createSpyObj(MessageService, ['']);
    
    const loadingService = {
      showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
          concatMap(() => obs$)
        )
      }
    }

    router = jasmine.createSpyObj(Router, ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: Router, useValue: router},
        {provide: AuthService, useValue: auth},
        {provide: LoadingService, useValue: loadingService},
        {provide: MessageService, useValue: message}
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {

    cartService = TestBed.inject(CartService);

    expect(cartService).toBeTruthy();

    expect(cartService.cartItems$).toBeTruthy();

    cartService.cartItems$
      .subscribe(cart => {

        expect(cart).toEqual([]);

      });

  });

  it('should initialize with cart loaded from local storage', () => {

    const cartInLocalStorage = '[{"test": "test"}]';
    
    localStorage.setItem('CART', cartInLocalStorage)

    cartService = TestBed.inject(CartService);

    expect(cartService).toBeTruthy();

    expect(cartService.cartItems$).toBeTruthy();

    cartService.cartItems$
      .subscribe(cart => {

        expect(cart).toEqual( JSON.parse(cartInLocalStorage) );

      });

  })

  it('should add a product to cart', () => {

    cartService = TestBed.inject(CartService);

    const product = {
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: '',
      quantity: 0,
      total: 0
    }

    cartService.addToCart(product, 3);

    cartService.cartItems$
      .subscribe(cart => {

        expect(cart.length).toBe(1);

        expect(cart[0].id).toBe(1);

      })

  })

  it('should remove product from cart', () => {

    cartService = TestBed.inject(CartService);

    const product = {
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: '',
      quantity: 0,
      total: 0
    };

    (cartService as any)._cartItemsSubject.next([product]);

    cartService.removeFromCart(product);

    cartService.cartItems$
      .subscribe(cart => {

        expect(cart.length).toBe(0);

        expect( (cartService as any)._lastDeletedItem )
          .withContext('The product that was removed from the cart was not cached')
          .toEqual(product);

      })

  });

  it('should return the quantity of all products in the cart', () => {

    cartService = TestBed.inject(CartService);

    const cart = [{
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: '',
      quantity: 50,
      total: 0
    }];

    (cartService as any)._cartItemsSubject.next(cart);


    cartService.getCartQuantity()
      .subscribe(count => {

        expect(count).toBe(50);

      });

  });

  it('should return the cart qunatity of a product by id', () => {

    cartService = TestBed.inject(CartService);

    const cart = [{
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: '',
      quantity: 1,
      total: 0
    }];

    (cartService as any)._cartItemsSubject.next(cart);

    cartService.getCartQuantityById(1)
      .subscribe(quantity => {

        expect(quantity).toBe(1);

      });

  });

  afterEach(() => {
    
    localStorage.removeItem('CART');

  })

});
