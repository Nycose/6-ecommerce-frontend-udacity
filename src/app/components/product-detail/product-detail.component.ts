import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, Observable, pipe, Subscriber, Subscription, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductStoreService } from 'src/app/services/product-store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private productId$: Subscription;

  product$: Observable<IProduct>;

  quantity$: Observable<number>;

  constructor(private productStore: ProductStoreService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.productId$ = this.route.params.pipe(
      map(params => params['productId']),
      tap(productId => {
        this.product$ = this.productStore.filterById(productId);
        this.quantity$ = this.cartService.getCartQuantityById(productId);
      })
    )
    .subscribe();

    
  }

  ngOnDestroy(): void {
    this.productId$.unsubscribe();
  }

}
