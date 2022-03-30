import { TestBed } from '@angular/core/testing';
import { ProductStoreService } from './product-store.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { PRODUCTS_DB } from 'src/server/product';
import { LoadingService } from './loading.service';
import { MessageService } from './message.service';
import { concatMap, Observable, of } from 'rxjs';

describe('ProductStoreService', () => {

  let productStoreService: ProductStoreService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(() => {

    const loadingService = {
      showLoadingUntilComplete<T>(obs$: Observable<T>): Observable<T> {
        return of(null).pipe(
          concatMap(() => obs$)
        )
      }
    }

    const messageService = jasmine.createSpyObj(['showErrors']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: LoadingService, useValue: loadingService},
        {provide: MessageService, useValue: messageService}
      ]
    });

    productStoreService = TestBed.inject(ProductStoreService);
    httpTestingController = TestBed.inject(HttpTestingController);

    req = httpTestingController.expectOne('/api/products', 'A single Http request was not made.');

    req.flush(PRODUCTS_DB);

  });

  it('should be created', () => {

    expect(productStoreService).toBeTruthy();

    expect(productStoreService.products$).toBeTruthy();

  });

  it('should load all products', () => {

    productStoreService.products$.subscribe(products => {

      expect(products).toBeTruthy();

      expect(products.length).toBeGreaterThan(1);

    })

    expect(req.request.method)
      .withContext('Http request method to load products is not of type GET')
      .toEqual('GET');
    
  });

  it('should filter products by category', () => {

    const CATEGORY = 'Salad';

    productStoreService.filterByCategory(CATEGORY)
    .subscribe(products => {

      expect(products.length)
        .withContext('No products returned')
        .toBeGreaterThan(1);

      const mismatchedProducts = products.filter(product => product?.category !== CATEGORY);

      expect(mismatchedProducts)
        .withContext('Unexpected product category found in products')
        .toEqual([]);

    })
    
  });

  it('should filter products by id', () => {

    productStoreService.filterById('1')
      .subscribe(product => {

        expect(product)
          .withContext('No product returned')
          .toBeTruthy();

        expect(product.id)
          .withContext('Unexpected product returned')
          .toBe(1);

      });

  })

  afterEach(() => {
    httpTestingController.verify();
  })

});
