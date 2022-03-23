import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, tap } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { ProductStoreService } from 'src/app/services/product-store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  private _productIdSubscription: Subscription;

  product$: Observable<IProduct>;

  quantity$: Observable<number>;

  constructor(
    private productStore: ProductStoreService, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this._productIdSubscription = this.route.params.pipe(
      map(params => params['productId']),
      tap(productId => {
        this.product$ = this.productStore.filterById(productId);
      })
    )
    .subscribe();

    
  }

  ngOnDestroy(): void {
    this._productIdSubscription.unsubscribe();
  }

}
