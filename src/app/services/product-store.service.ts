import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { IProduct } from '../models/product-model';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductStoreService {

  private _subject = new BehaviorSubject<IProduct[]>([]);
  products$: Observable<IProduct[]> = this._subject.asObservable();

  constructor(private _http: HttpClient, private _loadingService: LoadingService, private _messagesService: MessageService) { 
    this._loadAllProducts().subscribe();
  }

  private _loadAllProducts(): Observable<IProduct[]> {
    const products$ = this._http.get<IProduct[]>('/api/products')
      .pipe(
        catchError(err => {
          const message = 'Could not load products.';
          this._messagesService.showErrors(err, message);
          return throwError(() => new Error(err));
        }),
        tap(products => this._subject.next(products))
      );
    return this._loadingService.showLoadingUntilComplete(products$)
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
