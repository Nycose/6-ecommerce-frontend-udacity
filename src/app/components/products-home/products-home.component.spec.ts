import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { map, of } from 'rxjs';
import { ProductStoreService } from '../../services/product-store.service'
import { ProductsHomeComponent } from './products-home.component';


describe('ProductsHomeComponent', () => {
  let component: ProductsHomeComponent;
  let fixture: ComponentFixture<ProductsHomeComponent>;
  let el: DebugElement;
  let productStoreService: any;

  const testProducts = of([
    {
      id: 1,
      title: 'Salad w/ Protein',
      price: 10.75,
      category: 'Salad',
      description: 'Lorem ipsum',
      image: 'test',
      quantity: 0,
      total: 0
    },
    {
      id: 2,
      title: 'Pasta',
      price: 14.35,
      category: 'Main Dish',
      description: 'Lorem ipsum',
      image: 'test',
      quantity: 0,
      total: 0
    },
    {
      id: 3,
      title: 'Test Dessert',
      price: 14.35,
      category: 'Dessert',
      description: 'Lorem ipsum',
      image: 'test',
      quantity: 0,
      total: 0
    }
  ]);

  beforeEach(async () => {
    productStoreService = jasmine
      .createSpyObj('ProductStoreService', { filterByCategory: testProducts }, ['products$']);

    await TestBed.configureTestingModule({
      declarations: [ ProductsHomeComponent ],
      providers: [ { provide: ProductStoreService, useValue: productStoreService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should only display salad products', () => {

    component.salads$ = testProducts
      .pipe(
        map(p => p.filter(p => p.category === 'Salad') 
      ));

    (component.mainDishes$ as any) = of(null);
    (component.desserts$ as any) = of(null);

    fixture.detectChanges();

    const tabs = el.query(By.css('.tab-group'));

    expect(tabs.children.length)
      .withContext('Unexpected number of tabs displayed')
      .toBe(2);

  });

  it('should only display dessert products', () => {

    component.desserts$ = testProducts
      .pipe(
        map(p => p.filter(p => p.category === 'Dessert') 
      ));

    (component.salads$ as any) = of(null);
    (component.mainDishes$ as any) = of(null);

    fixture.detectChanges();

    const tabs = el.query(By.css('.tab-group'));

    expect(tabs.children.length)
      .withContext('Unexpected number of tabs displayed')
      .toBe(2);

  });

});
