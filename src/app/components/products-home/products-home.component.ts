import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/product-model';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductStoreService } from 'src/app/services/product-store.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit {

  products$: Observable<IProduct[]>;
  salads$: Observable<IProduct[]>;
  mainDishes$: Observable<IProduct[]>;
  desserts$: Observable<IProduct[]>;

  constructor(private productStore: ProductStoreService) { }

  ngOnInit(): void {
    this.products$ = this.productStore.products$;
    this.salads$ = this.productStore.filterByCategory("Salad");
    this.mainDishes$ = this.productStore.filterByCategory("Main Dish");
    this.desserts$ = this.productStore.filterByCategory("Dessert");
  }

}
