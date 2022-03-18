import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { IProduct } from '../models/product-model';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  private subject = new BehaviorSubject<IProduct[]>([]);
  products$: Observable<IProduct[]> = this.subject.asObservable();

  constructor(private http: HttpClient, private loadingService: LoadingService) { 
    this.loadAllProducts().subscribe();
  }

  private loadAllProducts(): Observable<IProduct[]> {
    const products$ = this.http.get<IProduct[]>('/api/products')
      .pipe(
        tap(products => this.subject.next(products))
      );
    return this.loadingService.showLoadingUntilComplete(products$)
  }

  filterByCategory(category: string): Observable<IProduct[]> {
    return this.products$.pipe(
      map(products => products.filter(product => product.category === category))
    );
  }

  filterById(id: string): Observable<IProduct> {
    return this.products$.pipe(
      map(products => products
        .filter(product => JSON.stringify(product.id) === id)[0]
        )
    );
  }
  
}
